import { state } from "./state.js";
import { CONFIG } from "./constants.js";
import { saveData } from "./persistence.js";
import { showError } from "./dom.js";

/**
 * Update match state on server.
 * @param {string} action - Action type.
 */
export function updateMatch(action = CONFIG.ACTIONS.ROUND) {
    try {
        if (!state.partaiData || !state.userData) {
            console.warn("⚠️ Missing required data for match update");
            return;
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

        axios.post(CONFIG.ENDPOINTS.OPERATOR_UPDATE, payload).catch((error) => {
            console.error("❌ Failed to update match:", error);
        });

        // Save state
        if (action !== CONFIG.ACTIONS.FINISH) {
            saveData(
                action === CONFIG.ACTIONS.START,
                action === CONFIG.ACTIONS.PAUSE ||
                    action === CONFIG.ACTIONS.PLAY
            );
        }

        if (action === CONFIG.ACTIONS.RESET) {
            localStorage.clear();
        }
    } catch (error) {
        console.error("❌ Error updating match:", error);
        showError("Failed to update match state");
    }
}

/**
 * Upload winner selection to server.
 * @param {string} winner - Winner corner ('merah' or 'biru').
 */
export function uploadWinnerData(winner) {
    try {
        if (!state.partaiData || !state.canSubmit) {
            return;
        }

        const winnerData = {
            name:
                winner === CONFIG.ACTIONS.WINNER_RED
                    ? state.partaiData.sudut_merah
                    : state.partaiData.sudut_biru,
            corner: winner === CONFIG.ACTIONS.WINNER_RED ? "merah" : "biru",
            contingent:
                winner === CONFIG.ACTIONS.WINNER_RED
                    ? state.partaiData.contingen_sudut_merah
                    : state.partaiData.contingen_sudut_biru,
        };

        axios
            .post(CONFIG.ENDPOINTS.WINNER, {
                message: {
                    action: "modal-winner",
                    data: winnerData,
                },
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
