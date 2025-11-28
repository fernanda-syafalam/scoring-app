import { CONFIG, TRACKED_ROLES } from "./constants.js";
import { state } from "./state.js";

/**
 * DOM elements cache for performance.
 */
export const elements = {
    start: document.getElementById("start"),
    finish: document.getElementById("finish"),
    next: document.getElementById("next"),
    prev: document.getElementById("prev"),
    refresh: document.getElementById("segarkan"),
    lock: document.getElementById("kunci"),
    pausePlay: document.getElementById("pause"),
    user: document.getElementById("user"),
    partai: document.getElementById("partai"),
    time: document.getElementById("time"),
    rounds: {},
    userStatus: {},
};

// Cache round buttons
CONFIG.ROUNDS.forEach((round) => {
    elements.rounds[round] = document.getElementById(round);
});

// Cache user status indicators
TRACKED_ROLES.forEach((role) => {
    elements.userStatus[role] = document.getElementById(`status_${role}`);
});

/**
 * Extract and validate user data from DOM.
 * @returns {Object} User data.
 * @throws {Error} If user data is invalid.
 */
export function getUserData() {
    try {
        if (!elements.user) {
            throw new Error("User element not found");
        }
        const userData = JSON.parse(elements.user.getAttribute("data-user"));
        if (!userData?.gelanggang_id) {
            throw new Error("Invalid user data: missing gelanggang_id");
        }
        return userData;
    } catch (error) {
        console.error("❌ Failed to extract user data:", error);
        throw error;
    }
}

/**
 * Extract and validate partai (match) data from DOM.
 * @returns {Object} Match data.
 * @throws {Error} If match data is invalid.
 */
export function getPartaiData() {
    try {
        if (!elements.partai) {
            throw new Error("Partai element not found");
        }
        const data = JSON.parse(elements.partai.getAttribute("data-partai"));
        if (!data) {
            throw new Error("Invalid partai data");
        }
        return data;
    } catch (error) {
        console.error("❌ Failed to extract partai data:", error);
        throw error;
    }
}

/**
 * Set element CSS class.
 * @param {HTMLElement} element - Target element.
 * @param {string} colorClass - CSS class name.
 * @param {boolean} add - Whether to add (true) or remove (false).
 */
export function setElementColor(element, colorClass, add) {
    try {
        if (!element || typeof colorClass !== "string") return;
        element.classList.toggle(colorClass, add);
    } catch (error) {
        console.error("❌ Error setting element color:", error);
    }
}

/**
 * Toggle pause/play UI state.
 * ✅ FIXED: Now properly handles explicit state values
 * @param {boolean|null} status - Explicit status value (true=paused, false=playing), or null to toggle
 */
export function togglePausePlay(status = null) {
    try {
        // Store previous state for logging
        const previousState = state.pauseStatus;

        if (status !== null && status !== undefined) {
            // Explicit state provided - set it directly (no toggle)
            state.pauseStatus = status;
        } else {
            // No explicit state - toggle current state
            state.pauseStatus = !state.pauseStatus;
        }

        // Update button UI
        if (elements.pausePlay) {
            // Button shows the NEXT action (what will happen when clicked)
            // If paused (true) → show "MULAI" (resume)
            // If playing (false) → show "JEDA" (pause)
            elements.pausePlay.textContent = state.pauseStatus
                ? "MULAI"  // ✅ FIXED: Swapped - when paused, show "start"
                : "JEDA";  // When playing, show "pause"

            setElementColor(
                elements.pausePlay,
                CONFIG.COLORS.YELLOW,
                !state.pauseStatus  // ✅ FIXED: Yellow when playing (not paused)
            );
        }

        console.log(`⏯️ Pause state: ${previousState} → ${state.pauseStatus} (${state.pauseStatus ? 'PAUSED' : 'PLAYING'})`);
    } catch (error) {
        console.error("❌ Error toggling pause/play:", error);
    }
}

/**
 * Toggle lock/unlock submission state.
 */
export function toggleLock() {
    try {
        state.canSubmit = !state.canSubmit;
        if (elements.lock) {
            elements.lock.textContent = state.canSubmit ? "BATAL" : "KUNCI";
            setElementColor(
                elements.lock,
                CONFIG.COLORS.YELLOW,
                !state.canSubmit
            );
        }
    } catch (error) {
        console.error("❌ Error toggling lock:", error);
    }
}

/**
 * Toggle button enabled/disabled state.
 * ✅ FIXED: Now properly handles explicit state values
 * @param {boolean|null} explicitState - Explicit disabled state (true=disabled, false=enabled), or null to toggle
 */
export function toggleButtonState(explicitState = null) {
    try {
        const previousState = state.isButtonDisable;

        if (explicitState !== null && explicitState !== undefined) {
            // Explicit state provided - set it directly (no toggle)
            state.isButtonDisable = explicitState;
        } else {
            // No explicit state - toggle current state
            state.isButtonDisable = !state.isButtonDisable;
        }

        // Round buttons
        CONFIG.ROUNDS.forEach((round) => {
            if (elements.rounds[round]) {
                elements.rounds[round].disabled = state.isButtonDisable;
            }
        });

        // Control buttons
        if (elements.pausePlay)
            elements.pausePlay.disabled = state.isButtonDisable;
        if (elements.finish) elements.finish.disabled = state.isButtonDisable;
        if (elements.start) elements.start.disabled = !state.isButtonDisable; // START is opposite
        if (elements.prev) elements.prev.disabled = state.isButtonDisable;
        if (elements.next) elements.next.disabled = state.isButtonDisable;

        // ✅ FIXED: Special buttons that should ALWAYS be enabled
        // Refresh button should always work for emergency reset
        if (elements.refresh) elements.refresh.disabled = false;
        // Lock button should always work for submission control
        if (elements.lock) elements.lock.disabled = false;

        console.log(`🔘 Button state: ${previousState} → ${state.isButtonDisable} (${state.isButtonDisable ? 'DISABLED' : 'ENABLED'})`);
    } catch (error) {
        console.error("❌ Error toggling button state:", error);
    }
}

/**
 * Change active round indicator UI.
 * @param {string} currentRound - Current round.
 * @param {string} nextRound - Next round.
 */
export function changeRoundIndicator(currentRound, nextRound) {
    try {
        if (!elements.rounds[currentRound] || !elements.rounds[nextRound]) {
            console.warn(`⚠️ Round elements not found`);
            return;
        }

        // Deactivate current round
        setElementColor(
            elements.rounds[currentRound],
            CONFIG.COLORS.GRAY,
            true
        );
        setElementColor(
            elements.rounds[currentRound],
            CONFIG.COLORS.YELLOW,
            false
        );
        elements.rounds[currentRound].disabled = true;

        // Activate next round
        setElementColor(elements.rounds[nextRound], CONFIG.COLORS.GRAY, false);
        setElementColor(elements.rounds[nextRound], CONFIG.COLORS.YELLOW, true);
        elements.rounds[nextRound].disabled = true;
    } catch (error) {
        console.error("❌ Error changing round indicator:", error);
    }
}

/**
 * Change active round status.
 * @param {string} roundName - Round name.
 */
export function changeRoundStatus(roundName) {
    try {
        if (!CONFIG.ROUNDS.includes(roundName)) {
            console.warn(`⚠️ Invalid round name: ${roundName}`);
            return;
        }

        CONFIG.ROUNDS.forEach((round) => {
            if (elements.rounds[round]) {
                setElementColor(
                    elements.rounds[round],
                    CONFIG.COLORS.YELLOW,
                    round === roundName
                );
            }
        });

        state.activeRound = roundName;
    } catch (error) {
        console.error("❌ Error changing round status:", error);
    }
}

/**
 * Show error message to user.
 * @param {string} message - Error message.
 */
export function showError(message) {
    console.error("⚠️ Error:", message);
    // TODO: Implement toast notification library
}
