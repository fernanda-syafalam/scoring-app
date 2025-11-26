import { ROLE_IDS } from "./constants.js";
import { updateJuryIndicators, updatePopupState } from "./dom.js";

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
        updatePopupState(event.red_popup, event.blue_popup);
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
