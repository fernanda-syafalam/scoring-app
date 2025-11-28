import { joinChanel } from "../channel";
import { state } from "./state.js";
import { showError, setElementColor, elements } from "./dom.js";
import {
    ROLE_IDS,
    TRACKED_ROLES,
    CONFIG,
    countMinimumToStart,
} from "./constants.js";
import { uploadWinnerData } from "./api.js";
import {  handleRoundDone } from "./events.js";

/**
 * Setup WebSocket channels for real-time communication.
 * @param {Object} userData - User data with gelanggang_id.
 */
export function setupChannels(userData) {
    try {
        console.log("📡 Setting up WebSocket channels...");

        state.channelOperator = joinChanel("operator", userData.gelanggang_id);
        state.channelUpdateScore = joinChanel(
            "updateScore",
            userData.gelanggang_id
        );

        // Listen for operator events (winner selection, round done)
        state.channelOperator.listen(
            `.operator.${userData.gelanggang_id}`,
            handleOperatorEvent
        );

        // Track connected users
        state.channelUpdateScore
            .here(handleChannelUsers)
            .joining(handleUserJoin)
            .leaving(handleUserLeave)
            .listen(
                `.updateScore.${userData.gelanggang_id}`,
                handleScoreUpdate
            );

        console.log("✅ WebSocket channels configured");
    } catch (error) {
        console.error("❌ Error setting up channels:", error);
        showError("Failed to setup communication channels");
    }
}

/**
 * Handle operator events (winner selection, round completion).
 * @param {Object} event - Event data from WebSocket.
 */
function handleOperatorEvent(event) {
    try {
        if (!event || typeof event !== "object") {
            console.warn("⚠️ Invalid operator event:", event);
            return;
        }

        const action = event.action?.toLowerCase?.();

        if (
            action === CONFIG.ACTIONS.WINNER_RED ||
            action === CONFIG.ACTIONS.WINNER_BLUE
        ) {
            console.log(`🏆 Winner selection: ${action}`);
            uploadWinnerData(action);
        } else if (action === CONFIG.ACTIONS.ROUND_DONE) {
            console.log("📍 Round completed");
            handleRoundDone();
        } else if (action) {
            console.warn(`⚠️ Unknown operator action: ${action}`);
        }
    } catch (error) {
        console.error("❌ Error handling operator event:", error);
    }
}

/**
 * Handle initial list of connected users.
 * @param {Array} users - Connected users.
 */
function handleChannelUsers(users) {
    try {
        state.users = users || [];
        checkUserStatus();
    } catch (error) {
        console.error("❌ Error handling channel users:", error);
    }
}

/**
 * Handle user joining the channel.
 * @param {Object} user - User data.
 */
function handleUserJoin(user) {
    try {
        if (user) {
            state.users.push(user);
            console.log("👤 User joined:", ROLE_IDS[user.role_id] || "unknown");
            checkUserStatus();
        }
    } catch (error) {
        console.error("❌ Error handling user join:", error);
    }
}

/**
 * Handle user leaving the channel.
 * @param {Object} user - User data.
 */
function handleUserLeave(user) {
    try {
        if (user) {
            state.users = state.users.filter((u) => u.id !== user.id);
            console.log("👋 User left:", ROLE_IDS[user.role_id] || "unknown");
            checkUserStatus();
        }
    } catch (error) {
        console.error("❌ Error handling user leave:", error);
    }
}

/**
 * Handle score updates from judges.
 * @param {Object} event - Score update event.
 */
function handleScoreUpdate(event) {
    // Placeholder for future score update handling
    if (event) {
        // Future implementation
    }
}

/**
 * Check connected user status and enable/disable start button.
 */
export function checkUserStatus() {
    try {
        const userList = TRACKED_ROLES.reduce(
            (acc, role) => ({ ...acc, [role]: false }),
            {}
        );

        let activeUserCount = 0;

        state.users.forEach((user) => {
            const role = ROLE_IDS[user.role_id];
            if (role && TRACKED_ROLES.includes(role)) {
                activeUserCount++;
                userList[role] = true;
            }
        });

        // Enable start button when minimum users are present
        if (elements.start) {
            elements.start.disabled = activeUserCount < countMinimumToStart;
        }

        // Update role indicators
        TRACKED_ROLES.forEach((role) => {
            if (elements.userStatus[role]) {
                const isPresent = userList[role];
                setElementColor(
                    elements.userStatus[role],
                    CONFIG.COLORS.GRAY_LIGHT,
                    !isPresent
                );
                setElementColor(
                    elements.userStatus[role],
                    CONFIG.COLORS.YELLOW,
                    isPresent
                );
            }
        });
    } catch (error) {
        console.error("❌ Error checking user status:", error);
    }
}
