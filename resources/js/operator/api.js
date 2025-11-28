import { state } from "./state.js";
import { CONFIG } from "./constants.js";
import { saveData } from "./persistence.js";
import { showError } from "./dom.js";

/**
 * Update match state on server.
 * @param {string} action - Action type.
 * @returns {Promise} Axios promise for the request
 */
export function updateMatch(action = CONFIG.ACTIONS.ROUND) {
    try {
        if (!state.partaiData || !state.userData) {
            console.warn("⚠️ Missing required data for match update");
            return Promise.resolve();
        }

        const payload = {
            message: {
                blueName: state.partaiData.sudut_biru,
                redName: state.partaiData.sudut_merah,
                blueContingent: state.partaiData.contingen_sudut_biru,
                redContingent: state.partaiData.contingen_sudut_merah,
                babak: state.partaiData.babak,
                activeRound: state.activeRound,
                time: state.matchTime,
                action: action,
            },
        };

        // ✅ FIXED: Return the axios promise so callers can wait for completion
        const request = axios
            .post(CONFIG.ENDPOINTS.OPERATOR_UPDATE, payload)
            .catch((error) => {
                console.error("❌ Failed to update match:", error);
                throw error; // Re-throw so caller knows about the error
            });

        // ✅ FIXED: Simplified saveData() call - no more confusing parameters
        // Save state after any action except finish and reset
        if (
            action !== CONFIG.ACTIONS.FINISH &&
            action !== CONFIG.ACTIONS.RESET
        ) {
            saveData();
        }

        if (action === CONFIG.ACTIONS.RESET) {
            localStorage.clear();
        }

        return request;
    } catch (error) {
        console.error("❌ Error updating match:", error);
        showError("Failed to update match state");
        return Promise.reject(error); // Return rejected promise on error
    }
}

/**
 * Upload winner selection to server.
 * @param {string} winner - Winner corner ('merah' or 'biru').
 * @param {string} winMethod - Win method ('Teknik' or 'Diskualifikasi'). Defaults to 'Diskualifikasi' for operator selection.
 */
export function uploadWinnerData(winner, winMethod = "Diskualifikasi") {
    try {
        if (!state.partaiData || !state.canSubmit) {
            console.warn("⚠️ Cannot upload winner: missing data or submission locked");
            return;
        }

        // Determine winner information
        const isRed = winner === CONFIG.ACTIONS.WINNER_RED;
        const winnerName = isRed
            ? state.partaiData.sudut_merah
            : state.partaiData.sudut_biru;
        const winnerCorner = isRed ? "Merah" : "Biru";
        const winnerContingent = isRed
            ? state.partaiData.contingen_sudut_merah
            : state.partaiData.contingen_sudut_biru;


        const winnerData = {
            name: winnerName,
            corner: winnerCorner,
            contingent: winnerContingent,
            winMethod: winMethod, // ✅ NEW: Win method
            redScore: 0, // ✅ NEW: Placeholder (actual scores from judges)
            blueScore: 0, // ✅ NEW: Placeholder (actual scores from judges)
            redName: state.partaiData.sudut_merah,
            blueName: state.partaiData.sudut_biru,
            redContingent: state.partaiData.contingen_sudut_merah,
            blueContingent: state.partaiData.contingen_sudut_biru,
            babak: state.partaiData.babak,
            activeRound: state.activeRound,
        };

        console.log("📤 Uploading winner data:", winnerData);

        axios
            .post(CONFIG.ENDPOINTS.WINNER, {
                message: winnerData,
            })
            .then(() => {
                console.log("✅ Winner data uploaded successfully");
            })
            .catch((error) => {
                console.error("❌ Failed to upload winner data:", error);
                showError("Failed to submit winner");
            });
    } catch (error) {
        console.error("❌ Error uploading winner data:", error);
        showError("Error handling winner selection");
    }
}
