import { state } from "./state.js";
import { CONFIG } from "./constants.js";
import {
    changeRoundIndicator,
    toggleButtonState,
    togglePausePlay,
} from "./dom.js";

/**
 * Save operator state to localStorage.
 * ✅ FIXED: Simplified to always save current state directly
 * No more confusing conditional logic based on call source
 */
export function saveData() {
    try {
        const data = {
            pauseStatus: state.pauseStatus,
            isButtonDisable: state.isButtonDisable,
            activeRound: state.activeRound,
        };
        localStorage.setItem(
            CONFIG.STORAGE.OPERATOR_DATA,
            JSON.stringify(data)
        );
        console.log('💾 Operator state saved:', data);
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

        // ✅ FIXED: Set state values from saved data
        state.pauseStatus = data.pauseStatus;
        state.isButtonDisable = data.isButtonDisable;
        state.activeRound = data.activeRound;

        console.log(`📦 Restoring state: pauseStatus=${data.pauseStatus}, isButtonDisable=${data.isButtonDisable}, activeRound=${data.activeRound}`);

        // Update UI to match saved state
        const roundNum = parseInt(state.activeRound.split("-")[1]);

        for (let i = 0; i < roundNum - 1; i++) {
            const currentRound = `round-${i + 1}`;
            const nextRound = `round-${i + 2}`;
            changeRoundIndicator(currentRound, nextRound);
        }

        // ✅ FIXED: Pass explicit state values instead of toggling
        // These functions now accept explicit parameters to set state directly
        toggleButtonState(data.isButtonDisable);  // Set to saved disabled state
        togglePausePlay(data.pauseStatus);        // Set to saved pause status

        console.log("✅ Restored operator state from localStorage");
    } catch (error) {
        console.error("❌ Error loading saved data:", error);
    }
}
