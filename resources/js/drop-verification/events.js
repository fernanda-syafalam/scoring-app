import { PATHS, CORNERS } from "./constants.js";
import {
    elements,
    resetAllJuryIndicators,
    updateChoiceIndicator,
    highlightDewanSelection,
} from "./dom.js";
import { sendVerification } from "./api.js";
import { state } from "./state.js";

export function setupEventListeners(userData) {
    const path = window.location.pathname;

    if (path === PATHS.DEWAN) {
        setupDewanListeners();
    } else if (path === PATHS.JURI) {
        setupJuriListeners(userData.details);
    }
}

function setupDewanListeners() {
    // CALL buttons - trigger drop verification
    if (elements.popup.red) {
        elements.popup.red.addEventListener("click", () => {
            sendVerification({ redPopup: true, bluePopup: false, showResultOnPapanScore: false });
            resetAllJuryIndicators();
            state.dewanChoice = ""; // Reset dewan choice
        });
    }

    if (elements.popup.blue) {
        elements.popup.blue.addEventListener("click", () => {
            sendVerification({ redPopup: false, bluePopup: true, showResultOnPapanScore: false });
            resetAllJuryIndicators();
            state.dewanChoice = ""; // Reset dewan choice
        });
    }

    // Dewan override buttons - let dewan change the result
    if (elements.dewanOverride.blue) {
        elements.dewanOverride.blue.addEventListener("click", () => {
            state.dewanChoice = CORNERS.BLUE;
            highlightDewanSelection(CORNERS.BLUE);
            console.log("[DropVerification] Dewan selected:", CORNERS.BLUE);
        });
    }

    if (elements.dewanOverride.invalid) {
        elements.dewanOverride.invalid.addEventListener("click", () => {
            state.dewanChoice = CORNERS.INVALID;
            highlightDewanSelection(CORNERS.INVALID);
            console.log("[DropVerification] Dewan selected:", CORNERS.INVALID);
        });
    }

    if (elements.dewanOverride.red) {
        elements.dewanOverride.red.addEventListener("click", () => {
            state.dewanChoice = CORNERS.RED;
            highlightDewanSelection(CORNERS.RED);
            console.log("[DropVerification] Dewan selected:", CORNERS.RED);
        });
    }

    // Cancel button - close modal without showing result on papan_score
    if (elements.dewanButtons.cancel) {
        elements.dewanButtons.cancel.addEventListener("click", () => {
            console.log("[DropVerification] Dewan cancelled drop verification");
            sendVerification({
                redPopup: false,
                bluePopup: false,
                showResultOnPapanScore: false,
            });
            state.dewanChoice = ""; // Reset choice
        });
    }

    // Confirm button - broadcast final result to papan_score
    if (elements.dewanButtons.confirm) {
        elements.dewanButtons.confirm.addEventListener("click", () => {
            // Determine final result: dewanChoice if set, otherwise use judges' votes
            const finalResult = state.dewanChoice || determineFinalResultFromJudges();

            console.log("[DropVerification] Dewan confirmed result:", finalResult);

            // Broadcast final result with flag to show on papan_score
            sendVerification({
                redPopup: false,
                bluePopup: false,
                showResultOnPapanScore: true,
                finalResult: finalResult,
                dewanChoice: state.dewanChoice,
            });

            state.dewanChoice = ""; // Reset choice
        });
    }

    // Legacy close button (if exists)
    if (elements.popup.close) {
        elements.popup.close.addEventListener("click", () => {
            sendVerification({ redPopup: false, bluePopup: false, showResultOnPapanScore: false });
        });
    }
}

/**
 * Determine final result from judge votes
 * Uses simple logic: if all 3 judges agree, use that. Otherwise, return the first judge's vote.
 * @returns {string} Final result
 */
function determineFinalResultFromJudges() {
    const votes = [state.juriPertama, state.juriKedua, state.juriKetiga];

    // Filter out empty votes
    const validVotes = votes.filter(v => v && v.trim() !== "");

    if (validVotes.length === 0) {
        console.warn("[DropVerification] No judge votes found, defaulting to INVALID");
        return CORNERS.INVALID;
    }

    // Check if all judges agree
    const allSame = validVotes.every(v => v === validVotes[0]);
    if (allSame) {
        console.log("[DropVerification] All judges agree:", validVotes[0]);
        return validVotes[0];
    }

    // Count votes and return majority or first vote
    const voteCounts = {};
    validVotes.forEach(vote => {
        voteCounts[vote] = (voteCounts[vote] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(voteCounts));
    const majorityVote = Object.keys(voteCounts).find(vote => voteCounts[vote] === maxCount);

    console.log("[DropVerification] Judge votes:", voteCounts, "Using:", majorityVote);
    return majorityVote || validVotes[0];
}

function setupJuriListeners(userDetails) {
    if (!userDetails?.role_id) {
        console.error("[DropVerification] Invalid user details");
        return;
    }

    const roleId = userDetails.role_id;

    if (elements.choice.blue) {
        elements.choice.blue.addEventListener("click", () => {
            handleJuryVote(roleId, CORNERS.BLUE);
        });
    }

    if (elements.choice.invalid) {
        elements.choice.invalid.addEventListener("click", () => {
            handleJuryVote(roleId, CORNERS.INVALID);
        });
    }

    if (elements.choice.red) {
        elements.choice.red.addEventListener("click", () => {
            handleJuryVote(roleId, CORNERS.RED);
        });
    }
}

function handleJuryVote(roleId, choice) {
    switch (roleId) {
        case 5:
            state.juriPertama = choice;
            break;
        case 6:
            state.juriKedua = choice;
            break;
        case 7:
            state.juriKetiga = choice;
            break;
        default:
            console.error("[DropVerification] Invalid role ID:", roleId);
            return;
    }

    sendVerification({
        juriPertama: state.juriPertama,
        juriKedua: state.juriKedua,
        juriKetiga: state.juriKetiga,
        redPopup: state.redPopup,
        bluePopup: state.bluePopup,
    });

    updateChoiceIndicator(choice);
}
