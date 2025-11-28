/**
 * Papan Score (Scoreboard) Module
 * Displays live match scoring and status for spectators
 *
 * @module PapanScore
 * @requires bootstrap.js - Echo WebSocket connection
 * @requires library/ScoreFunc.js - Scoring functions
 * @requires library/JuriFunc.js - Judge functions
 * @requires library/DewanFunc.js - Council/referee functions
 */

require("./bootstrap");

import {
    changeIndicatorPelanggaran,
    clearIndicator,
    updateDataIndicator,
} from "./library/DewanFunc";

import {
    startPertandingan,
    loadDataSaved,
    updateScore,
    activeRound,
    changeScoreElement,
    channelUpdateScore,
    channelOperator,
    userData,
    getDataGelanggang,
    channelPenalty,
} from "./library/ScoreFunc";

import {
    getId,
    indicatorUpdate,
    startTimeoutIndicator,
} from "./library/JuriFunc";

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Configuration constants
 * @type {Object}
 */
const CONFIG = {
    // Timer settings
    TIMER: {
        DEFAULT_DURATION: 120,
        UPDATE_INTERVAL: 1000,
    },

    // Match actions
    ACTIONS: {
        START: "start",
        PAUSE: "pause",
        PLAY: "play",
        RESET: "reset",
        FINISH: "finish",
        ROUND: "round",
    },

    // Storage keys
    STORAGE: {
        TIMER_STARTED: "timerStarted",
        TIMER_PAUSED: "timerIsPaused",
        TIMER_SECONDS: "timerSecondsRemaining",
        TIMER_END_TIME: "timerEndTime",
    },
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * Application state
 * @type {Object}
 */
const state = {
    blueScore: null,
    redScore: null,
    timerDisplay: null,
    timerStarted: false,
    timePerRound: CONFIG.TIMER.DEFAULT_DURATION,
    countdown: null,
    isPaused: false,
    endTime: null,
    secondsRemaining: 0,
    round: "round-1",
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the papan score (scoreboard) module
 */
function init() {
    try {
        console.log("🚀 Initializing Papan Score (Scoreboard)...");

        // Cache DOM elements
        state.blueScore = document.getElementById("blueScore");
        state.redScore = document.getElementById("redScore");
        state.timerDisplay = document.getElementById("timer");

        if (!state.blueScore || !state.redScore || !state.timerDisplay) {
            console.warn(
                "⚠️ Some DOM elements not found, scoreboard may not function fully"
            );
        }

        // Setup event listeners
        setupWebSocketListeners();

        // Initialize score display
        changeScoreElement(state.redScore, state.blueScore);
        loadDataSaved();

        // Restore timer state if available
        if (localStorage.getItem(CONFIG.STORAGE.TIMER_STARTED)) {
            console.log("📦 Restoring timer state...");
            loadSavedTimer();
        }

        console.log("✅ Papan Score initialized successfully");
    } catch (error) {
        console.error("❌ Error initializing papan score:", error);
        showError("Failed to initialize scoreboard");
    }
}

/**
 * Setup WebSocket listeners for real-time score updates
 */
function setupWebSocketListeners() {
    try {
        // Listen for judge score updates
        const channel = Echo.join(`presence.juri.${userData.gelanggang_id}`);

        channel.listen(`.juri.${userData.gelanggang_id}`, (event) => {
            try {
                handleJudgeUpdate(event);
            } catch (error) {
                console.error("❌ Error handling judge update:", error);
            }
        });

        // Listen for penalty changes
        channelPenalty.listen(`.penalty.${userData.gelanggang_id}`, (event) => {
            try {
                if (event && event.color && event.penalty !== undefined) {
                    changeIndicatorPelanggaran(event.color, event.penalty);
                }
            } catch (error) {
                console.error("❌ Error handling penalty:", error);
            }
        });

        // Listen for score updates from other judges
        channelUpdateScore.listen(
            `.updateScore.${userData.gelanggang_id}`,
            (event) => {
                try {
                    updateScore(event);
                } catch (error) {
                    console.error("❌ Error handling score update:", error);
                }
            }
        );

        // Listen for operator controls
        channelOperator.listen(
            `.operator.${userData.gelanggang_id}`,
            (event) => {
                try {
                    handleOperatorAction(event);
                } catch (error) {
                    console.error("❌ Error handling operator action:", error);
                }
            }
        );

        console.log("✅ WebSocket listeners attached");
    } catch (error) {
        console.error("❌ Error setting up WebSocket listeners:", error);
    }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Handle judge indicator updates from WebSocket
 * @param {Object} event - Judge event data
 */
function handleJudgeUpdate(event) {
    try {
        if (!event || typeof event !== "object") {
            console.warn("⚠️ Invalid judge event:", event);
            return;
        }

        const gerakan = event.gerakan;
        const sudut = event.sudut;
        const id = event.id;

        if (!gerakan || !sudut || !id) {
            console.warn("⚠️ Judge event missing required fields", event);
            return;
        }

        const elementName = getId(id + " " + gerakan + " " + sudut);
        indicatorUpdate(elementName, sudut);
        startTimeoutIndicator(elementName, sudut);
    } catch (error) {
        console.error("❌ Error handling judge update:", error);
    }
}

/**
 * Handle operator actions (start, pause, finish, round, etc.)
 * @param {Object} event - Operator action data
 */
function handleOperatorAction(event) {
    try {
        if (!event || typeof event !== "object") {
            console.warn("⚠️ Invalid operator event:", event);
            return;
        }

        const action = event.action?.toLowerCase?.();

        if (!action) {
            console.warn("⚠️ Operator event missing action property");
            return;
        }

        switch (action) {
            case CONFIG.ACTIONS.START:
                if (event.time && typeof event.time === "number") {
                    state.timePerRound = event.time;
                }
                console.log("📍 Match started");
                startPertandingan(event);
                break;

            case CONFIG.ACTIONS.RESET:
            case CONFIG.ACTIONS.FINISH:
                console.log(
                    `🔄 Match ${action}ed - clearing storage and reloading`
                );
                localStorage.clear();
                location.reload();
                break;

            case CONFIG.ACTIONS.ROUND:
                if (!event.activeRound) {
                    console.warn(
                        "⚠️ Round change missing activeRound property"
                    );
                    return;
                }
                console.log(`📍 Round changed to: ${event.activeRound}`);
                clearIndicator();
                handleRoundChange(event);
                break;

            case CONFIG.ACTIONS.PAUSE:
                console.log("⏸️ Match paused");
                updateTimer(CONFIG.ACTIONS.PAUSE);
                break;

            case CONFIG.ACTIONS.PLAY:
                console.log("▶️ Match resumed");
                if (event.time && typeof event.time === "number") {
                    state.timePerRound = event.time;
                }
                updateTimer(CONFIG.ACTIONS.PLAY);
                break;

            default:
                console.warn(`⚠️ Unknown operator action: ${action}`);
        }
    } catch (error) {
        console.error("❌ Error handling operator event:", error);
    }
}

/**
 * Handle round change event
 * @param {Object} event - Round change event data
 */
function handleRoundChange(event) {
    try {
        if (!event.activeRound) {
            console.warn("⚠️ Invalid round in event:", event);
            return;
        }

        state.round = event.activeRound;
        updateDataIndicator();

        if (activeRound && activeRound.textContent !== undefined) {
            activeRound.textContent = event.activeRound.toUpperCase();
        }
    } catch (error) {
        console.error("❌ Error handling round change:", error);
    }
}

// ============================================================================
// TIMER FUNCTIONS
// ============================================================================

/**
 * Update timer state (play/pause)
 * @param {string} action - Action type ('play' or 'pause')
 */
function updateTimer(action) {
    try {
        if (action === CONFIG.ACTIONS.PLAY) {
            if (!state.timerStarted) {
                state.isPaused = false;
                startTimer(state.timePerRound);
                state.timerStarted = true;
                saveTimerState();
            } else {
                state.isPaused = false;
                startTimer(state.secondsRemaining);
                saveTimerState();
            }
        } else if (action === CONFIG.ACTIONS.PAUSE) {
            state.secondsRemaining = Math.max(
                0,
                Math.ceil((state.endTime - Date.now()) / 1000)
            );
            state.isPaused = true;
            saveTimerState();
        }
    } catch (error) {
        console.error("❌ Error updating timer:", error);
    }
}

/**
 * Start the countdown timer
 * @param {number} seconds - Duration in seconds
 */
function startTimer(seconds) {
    try {
        if (!seconds || typeof seconds !== "number" || seconds < 0) {
            console.warn("⚠️ Invalid timer duration:", seconds);
            return;
        }

        clearInterval(state.countdown);

        if (state.isPaused) {
            state.endTime = Date.now() + state.secondsRemaining * 1000;
        } else {
            state.endTime = Date.now() + seconds * 1000;
            state.secondsRemaining = seconds;
        }

        displayTimeLeft(state.secondsRemaining);

        state.countdown = setInterval(() => {
            const secondsLeft = Math.max(
                0,
                Math.round((state.endTime - Date.now()) / 1000)
            );

            if (secondsLeft === 0) {
                clearInterval(state.countdown);
                if (!state.isPaused) {
                    clearTimerState();
                    if (state.timerDisplay) {
                        state.timerDisplay.textContent = "00:00";
                    }
                }
                return;
            }

            if (state.isPaused) return;

            displayTimeLeft(secondsLeft);
        }, CONFIG.TIMER.UPDATE_INTERVAL);
    } catch (error) {
        console.error("❌ Error starting timer:", error);
    }
}

/**
 * Display formatted time on scoreboard
 * @param {number} seconds - Seconds to display
 */
function displayTimeLeft(seconds) {
    try {
        if (typeof seconds !== "number" || seconds < 0) {
            console.warn("⚠️ Invalid seconds for display:", seconds);
            return;
        }

        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes < 10 ? "0" : ""}${minutes}:${
            remainderSeconds < 10 ? "0" : ""
        }${remainderSeconds}`;

        if (!state.isPaused && state.timerDisplay) {
            state.timerDisplay.textContent = display;
        }
    } catch (error) {
        console.error("❌ Error displaying time:", error);
    }
}

/**
 * Clear timer state from localStorage
 */
function clearTimerState() {
    try {
        state.timerStarted = false;
        localStorage.removeItem(CONFIG.STORAGE.TIMER_STARTED);
        localStorage.removeItem(CONFIG.STORAGE.TIMER_PAUSED);
        localStorage.removeItem(CONFIG.STORAGE.TIMER_SECONDS);
        localStorage.removeItem(CONFIG.STORAGE.TIMER_END_TIME);
    } catch (error) {
        console.error("❌ Error clearing timer state:", error);
    }
}

/**
 * Save timer state to localStorage
 */
function saveTimerState() {
    try {
        localStorage.setItem(
            CONFIG.STORAGE.TIMER_STARTED,
            String(state.timerStarted)
        );
        localStorage.setItem(
            CONFIG.STORAGE.TIMER_PAUSED,
            String(state.isPaused)
        );
        localStorage.setItem(
            CONFIG.STORAGE.TIMER_SECONDS,
            String(state.secondsRemaining)
        );
        localStorage.setItem(
            CONFIG.STORAGE.TIMER_END_TIME,
            String(state.endTime)
        );
    } catch (error) {
        console.error("❌ Error saving timer state:", error);
    }
}

/**
 * Load timer state from localStorage
 */
function loadSavedTimer() {
    try {
        const saved = {
            started:
                localStorage.getItem(CONFIG.STORAGE.TIMER_STARTED) === "true",
            paused:
                localStorage.getItem(CONFIG.STORAGE.TIMER_PAUSED) === "true",
            seconds:
                parseInt(localStorage.getItem(CONFIG.STORAGE.TIMER_SECONDS)) ||
                0,
            endTime:
                parseInt(localStorage.getItem(CONFIG.STORAGE.TIMER_END_TIME)) ||
                0,
        };

        state.timerStarted = saved.started;
        state.isPaused = saved.paused;
        state.secondsRemaining = saved.seconds;
        state.endTime = saved.endTime;

        if (state.secondsRemaining > 0) {
            startTimer(state.secondsRemaining);
        }
    } catch (error) {
        console.error("❌ Error loading saved timer:", error);
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    console.error("⚠️ Error:", message);
    // TODO: Implement toast notification library
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

/**
 * Export for testing and external access
 */
export {
    init,
    CONFIG,
    state,
    handleOperatorAction,
    updateTimer,
    startTimer,
    displayTimeLeft,
    clearTimerState,
    saveTimerState,
    loadSavedTimer,
    handleJudgeUpdate,
    handleRoundChange,
};
