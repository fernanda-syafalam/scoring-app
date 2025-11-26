/**
 * Ketua Pertandingan (Match Committee Head) Module
 * Monitors overall match status and aggregates data from all judges
 * Provides oversight of scores, penalties, and match progression
 *
 * @fileoverview Manages match committee head interface with comprehensive data tracking
 * @version 2.0.0
 */

import {
    channelKetuaPertandingan,
    storeGelanggangData,
    startPertandingan,
    loadDataSaved,
    changeRound,
    storeJurror,
    storePoint,
    storeDroppingRed,
    storeDroppingBlue,
    storeRedPenalty,
    storeBluePenalty,
} from "./library/KetuaFunc.js";

import {
    channelUpdateScore,
    channelOperator,
    updateScore,
    userData,
    savedGelanggangData,
} from "./library/ScoreFunc.js";
import axios from "axios";

require("./bootstrap");

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Configuration constants
 * @type {Object}
 */
const CONFIG = {
    // Operator actions
    ACTIONS: {
        START: "start",
        FINISH: "finish",
        RESET: "reset",
        ROUND: "round",
        PAUSE: "pause",
        PLAY: "play",
    },

    // API endpoints
    ENDPOINTS: {
        SCREENSHOT: "/capture-screenshot",
    },

    // Storage keys
    STORAGE: {
        KETUA_DATA: "dataKetua",
    },
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the ketua pertandingan module
 */
function initKetuaPertandingan() {
    try {
        console.log("🚀 Initializing Ketua Pertandingan Module...");

        // Validate user data
        if (!userData || !userData.gelanggang_id) {
            throw new Error("Invalid user data: missing gelanggang_id");
        }

        // Store initial gelanggang data
        if (savedGelanggangData) {
            storeGelanggangData(savedGelanggangData);
        }

        // Restore previously saved data if available
        loadDataSaved();

        // Setup WebSocket channels
        setupChannels();

        console.log("✅ Ketua Pertandingan Module initialized successfully");
    } catch (error) {
        console.error("❌ Fatal error initializing ketua pertandingan:", error);
        showError("Failed to initialize committee head interface");
    }
}

/**
 * Setup WebSocket channels for real-time communication
 */
function setupChannels() {
    try {
        console.log("📡 Setting up WebSocket channels...");

        // Listen for score updates from judges and dewan
        channelUpdateScore.listen(
            `.updateScore.${userData.gelanggang_id}`,
            (event) => {
                try {
                    handleScoreUpdate(event);
                } catch (error) {
                    console.error("❌ Error handling score update:", error);
                }
            }
        );

        // Listen for operator commands (start, pause, reset, etc.)
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

        // Listen for ketua pertandingan specific events (judge scores)
        channelKetuaPertandingan.listen(
            `.ketuaPertandingan.${userData.gelanggang_id}`,
            (event) => {
                try {
                    handleJudgeScore(event);
                } catch (error) {
                    console.error("❌ Error handling judge score:", error);
                }
            }
        );

        console.log("✅ WebSocket channels configured");
    } catch (error) {
        console.error("❌ Error setting up channels:", error);
        showError("Failed to setup communication channels");
    }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Handle score updates from judges and dewan
 * @param {Object} event - Score update event
 */
function handleScoreUpdate(event) {
    // Input validation
    if (!event || typeof event !== "object") {
        console.error("❌ Invalid score update event:", event);
        return;
    }

    try {
        // Update main score display
        updateScore(event);

        // Store point data
        storePoint();

        // Store dropping data if present
        if (event.droppingRed !== undefined) {
            storeDroppingRed(event.droppingRed);
        }

        if (event.droppingBlue !== undefined) {
            storeDroppingBlue(event.droppingBlue);
        }

        // Store penalty data if present
        if (event.red_penalty !== undefined) {
            storeRedPenalty(event.red_penalty);
        }

        if (event.blue_penalty !== undefined) {
            storeBluePenalty(event.blue_penalty);
        }

        console.log("📊 Score update processed successfully");
    } catch (error) {
        console.error("❌ Error processing score update:", error);
    }
}

/**
 * Handle individual judge scoring data
 * @param {Object} event - Judge score event
 */
function handleJudgeScore(event) {
    // Input validation
    if (!event || typeof event !== "object") {
        console.error("❌ Invalid judge score event:", event);
        return;
    }

    // Validate required properties
    if (!event.id || !event.scorePiece || !event.sudut) {
        console.warn(
            "⚠️ Judge score event missing required properties:",
            event
        );
        return;
    }

    try {
        storeJurror(event.id, event.scorePiece, event.sudut);
        console.log(
            `📝 Judge ${event.id} score stored: ${event.scorePiece} for ${event.sudut}`
        );
    } catch (error) {
        console.error("❌ Error handling judge score:", error);
    }
}

/**
 * Handle broadcast actions from operator
 * @param {Object} event - Operator action event
 */
function handleOperatorAction(event) {
    // Input validation
    if (!event || typeof event !== "object") {
        console.error("❌ Invalid operator event received:", event);
        return;
    }

    const action = event.action?.toLowerCase?.();
    if (!action) {
        console.warn("⚠️ Event missing action property");
        return;
    }

    // Action handlers map
    const actionHandlers = {
        start: () => {
            console.log("📍 Match started");
            startPertandingan(event);
        },
        finish: () => {
            console.log("✅ Match finished");
            captureScreenshot();
        },
        round: () => {
            if (!event.activeRound) {
                console.warn("⚠️ Round change missing activeRound");
                return;
            }
            console.log(`📍 Round changed to: ${event.activeRound}`);
            changeRound(event);
        },
        reset: () => {
            console.log("🔄 Match reset");
            localStorage.clear();
            location.reload();
        },
        play: () => {
            console.log("▶️ Match resumed");
            // No specific action needed for ketua pertandingan
        },
        pause: () => {
            console.log("⏸️ Match paused");
            // No specific action needed for ketua pertandingan
        },
    };

    // Execute handler or log unknown action
    const handler = actionHandlers[action];
    if (handler) {
        try {
            handler();
        } catch (error) {
            console.error(`❌ Error executing action '${action}':`, error);
        }
    } else {
        console.warn(`⚠️ Unknown operator action: ${action}`);
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Capture screenshot of current match state
 * Sends request to server to capture and save screenshot
 */
function captureScreenshot() {
    try {
        console.log("📸 Capturing screenshot...");

        axios
            .get(CONFIG.ENDPOINTS.SCREENSHOT)
            .then(() => {
                console.log("✅ Screenshot captured successfully");
            })
            .catch((error) => {
                console.error("❌ Failed to capture screenshot:", error);
                // Don't show error to user - screenshot is not critical
            });
    } catch (error) {
        console.error("❌ Error initiating screenshot capture:", error);
    }
}

/**
 * Show error message to user
 * @param {string} message - Error message
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
    document.addEventListener("DOMContentLoaded", initKetuaPertandingan);
} else {
    initKetuaPertandingan();
}

/**
 * Export for testing and external access
 */
export {
    initKetuaPertandingan,
    handleOperatorAction,
    handleScoreUpdate,
    handleJudgeScore,
    captureScreenshot,
    CONFIG,
};
