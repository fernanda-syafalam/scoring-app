import { PATHS, CORNERS } from "./constants.js";
import {
    elements,
    resetAllJuryIndicators,
    updateChoiceIndicator,
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
    if (elements.popup.red) {
        elements.popup.red.addEventListener("click", () => {
            sendVerification({ redPopup: true, bluePopup: false });
            resetAllJuryIndicators();
        });
    }

    if (elements.popup.blue) {
        elements.popup.blue.addEventListener("click", () => {
            sendVerification({ redPopup: false, bluePopup: true });
            resetAllJuryIndicators();
        });
    }

    if (elements.popup.close) {
        elements.popup.close.addEventListener("click", () => {
            sendVerification({ redPopup: false, bluePopup: false });
        });
    }
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
