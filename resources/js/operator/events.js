import {
    elements,
    setElementColor,
    toggleButtonState,
    togglePausePlay,
    changeRoundIndicator,
    changeRoundStatus,
    showError,
} from "./dom.js";
import { CONFIG } from "./constants.js";
import { state } from "./state.js";
import { updateMatch } from "./api.js";
import { timesValue } from "../library/Time.js";

/**
 * Setup UI event listeners for operator controls.
 */
export function setupEventListeners() {
    try {
        console.log("⚙️ Setting up event listeners...");

        // Match control buttons
        if (elements.start)
            elements.start.addEventListener("click", handleStart);
        if (elements.finish)
            elements.finish.addEventListener("click", handleFinish);
        if (elements.lock) elements.lock.addEventListener("click", toggleLock);
        if (elements.refresh)
            elements.refresh.addEventListener("click", handleRefresh);
        if (elements.pausePlay)
            elements.pausePlay.addEventListener("click", handlePausePlay);

        // Round selection buttons
        CONFIG.ROUNDS.forEach((round) => {
            if (elements.rounds[round]) {
                elements.rounds[round].addEventListener("click", () =>
                    handleRoundClick(round)
                );
            }
        });

        // Time selection dropdown
        if (elements.time) {
            elements.time.addEventListener("change", handleTimeChange);
        }

        console.log("✅ Event listeners attached");
    } catch (error) {
        console.error("❌ Error setting up event listeners:", error);
    }
}

/**
 * Handle start match button click.
 */
function handleStart() {
    try {
        console.log("▶️ Starting match...");
        updateMatch(CONFIG.ACTIONS.START);
        setElementColor(elements.start, CONFIG.COLORS.YELLOW, true);
        setElementColor(elements.finish, CONFIG.COLORS.YELLOW, false);
        setElementColor(
            elements.rounds[state.activeRound],
            CONFIG.COLORS.YELLOW,
            true
        );
        toggleButtonState();
    } catch (error) {
        console.error("❌ Error starting match:", error);
        showError("Failed to start match");
    }
}

/**
 * Handle finish match button click.
 */
function handleFinish() {
    try {
        console.log("⏹️ Finishing match...");
        setElementColor(elements.start, CONFIG.COLORS.YELLOW, false);
        finishMatch();
    } catch (error) {
        console.error("❌ Error finishing match:", error);
        showError("Failed to finish match");
    }
}

/**
 * Handle refresh (reset) button click.
 */
function handleRefresh() {
    try {
        console.log("🔄 Resetting match...");
        updateMatch(CONFIG.ACTIONS.RESET);
        localStorage.clear();
        location.reload();
    } catch (error) {
        console.error("❌ Error refreshing:", error);
    }
}

/**
 * Handle pause/play button click.
 */
function handlePausePlay() {
    try {
        togglePausePlay();
        const action = state.pauseStatus
            ? CONFIG.ACTIONS.PAUSE
            : CONFIG.ACTIONS.PLAY;
        console.log(`⏸️ Match ${action}...`);
        updateMatch(action);
    } catch (error) {
        console.error("❌ Error toggling pause/play:", error);
        showError("Failed to toggle pause/play");
    }
}

/**
 * Handle time selection change.
 */
function handleTimeChange() {
    try {
        if (elements.time && elements.time.value in timesValue) {
            state.matchTime = timesValue[elements.time.value];
            console.log(`⏱️ Match time changed to: ${state.matchTime}s`);
        }
    } catch (error) {
        console.error("❌ Error changing match time:", error);
    }
}

/**
 * Handle round button click.
 * @param {string} round - Round name (e.g., 'round-1').
 */
function handleRoundClick(round) {
    try {
        if (!CONFIG.ROUNDS.includes(round)) {
            console.warn(`⚠️ Invalid round: ${round}`);
            return;
        }
        console.log(`📍 Round selected: ${round}`);
        changeRoundStatus(round);
        updateMatch();
    } catch (error) {
        console.error("❌ Error handling round click:", error);
    }
}

/**
 * Handle round completion.
 */
export function handleRoundDone() {
    try {
        const roundNum = parseInt(state.activeRound.split("-")[1]);

        if (roundNum >= CONFIG.MAX_ROUNDS) {
            console.log("🏁 All rounds completed");
            finishMatch();
        } else {
            const nextRound = `round-${roundNum + 1}`;
            console.log(`📍 Moving to next round: ${nextRound}`);
            changeRoundIndicator(state.activeRound, nextRound);
            state.activeRound = nextRound;
            updateMatch();
            togglePausePlay();
        }
    } catch (error) {
        console.error("❌ Error handling round done:", error);
    }
}

/**
 * Finish the match.
 */
export function finishMatch() {
    try {
        console.log("✅ Match finished");

        // Reset all round buttons
        CONFIG.ROUNDS.slice(1).forEach((round) => {
            if (elements.rounds[round]) {
                setElementColor(
                    elements.rounds[round],
                    CONFIG.COLORS.GRAY,
                    false
                );
                setElementColor(
                    elements.rounds[round],
                    CONFIG.COLORS.YELLOW,
                    false
                );
            }
        });

        // Notify server
        updateMatch(CONFIG.ACTIONS.FINISH);

        // Reset UI
        toggleButtonState();
        togglePausePlay(false);
        changeRoundStatus("round-1");
    } catch (error) {
        console.error("❌ Error finishing match:", error);
    }
}
