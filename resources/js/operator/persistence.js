import { state } from "./state.js";
import { CONFIG } from "./constants.js";
import {
    changeRoundIndicator,
    toggleButtonState,
    togglePausePlay,
} from "./dom.js";

/**
 * Save operator state to localStorage.
 * @param {boolean} isFromStart - Called from start action.
 * @param {boolean} isFromPause - Called from pause/play action.
 */
export function saveData(isFromStart = false, isFromPause = false) {
    try {
        const data = {
            pauseStatus: isFromPause ? !state.pauseStatus : state.pauseStatus,
            isButtonDisable: isFromStart
                ? state.isButtonDisable
                : !state.isButtonDisable,
            activeRound: state.activeRound,
        };
        localStorage.setItem(
            CONFIG.STORAGE.OPERATOR_DATA,
            JSON.stringify(data)
        );
    } catch (error) {
        console.error("❌ Error saving data:", error);
    }
}

/**
 * Load saved operator state from localStorage.
 */
export function loadSavedData() {
    try {
        const data = JSON.parse(
            localStorage.getItem(CONFIG.STORAGE.OPERATOR_DATA)
        );

        if (!data) {
            console.warn("⚠️ No saved operator data found");
            return;
        }

        state.pauseStatus = data.pauseStatus;
        state.isButtonDisable = data.isButtonDisable;
        state.activeRound = data.activeRound;

        // Update UI to match saved state
        const roundNum = parseInt(state.activeRound.split("-")[1]);

        for (let i = 0; i < roundNum - 1; i++) {
            const currentRound = `round-${i + 1}`;
            const nextRound = `round-${i + 2}`;
            changeRoundIndicator(currentRound, nextRound);
        }

        toggleButtonState();
        togglePausePlay();

        console.log("✅ Restored operator state from localStorage");
    } catch (error) {
        console.error("❌ Error loading saved data:", error);
    }
}
