import { CONFIG } from "./constants.js";

/**
 * Application state.
 */
export const state = {
    activeRound: "round-1",
    pauseStatus: true, // ✅ FIXED: Default to paused (true) so button shows "MULAI" initially
    isButtonDisable: true,
    matchTime: CONFIG.DEFAULT_MATCH_TIME,
    users: [],
    canSubmit: true,
    userData: null,
    partaiData: null,
    channelOperator: null,
    channelUpdateScore: null,
};
