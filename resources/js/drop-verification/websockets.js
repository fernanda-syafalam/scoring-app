import { ROLE_IDS, PATHS } from "./constants.js";
import { updateJuryIndicators, updatePopupState, showPapanScoreResult } from "./dom.js";

export function setupWebSocketChannel(gelanggangId) {
    const channelName = `presence.dropVerification.${gelanggangId}`;
    const channel = Echo.join(channelName);

    channel
        .here((users) => {
            console.log(
                `[DropVerification] Connected to ${channelName}`,
                users
            );
            validateConnectedUsers(users);
        })
        .joining((user) => {
            console.log("[DropVerification] User joined:", user);
        })
        .leaving((user) => {
            console.log("[DropVerification] User left:", user);
        })
        .listen(`.dropVerification.${gelanggangId}`, handleVerificationEvent);

    return channel;
}

function handleVerificationEvent(event) {
    try {
        updateJuryIndicators(event);

        // Check if we should show result on papan_score
        const showResultOnPapanScore = event.show_result_on_papan_score || false;
        const finalResult = event.final_result || "";

        // Update popup state (handles showing/hiding modals based on role)
        updatePopupState(event.red_popup, event.blue_popup, showResultOnPapanScore);

        // If this is papan_score and we should show the result
        if (showResultOnPapanScore && finalResult && window.location.pathname === PATHS.PAPAN_SCORE) {
            console.log("[DropVerification] Showing result on papan_score:", finalResult);
            showPapanScoreResult(finalResult);
        }
    } catch (error) {
        console.error("[DropVerification] Event handling failed:", error);
    }
}

function validateConnectedUsers(users) {
    const requiredJudges = {
        juri_pertama: false,
        juri_kedua: false,
        juri_ketiga: false,
    };

    users.forEach((user) => {
        const roleName = ROLE_IDS[user.role_id];
        if (roleName) {
            requiredJudges[roleName] = true;
        }
    });

    Object.entries(requiredJudges).forEach(([role, present]) => {
        if (!present) {
            console.warn(`[DropVerification] ${role} not connected`);
        }
    });
}
