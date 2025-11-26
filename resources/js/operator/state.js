import { CONFIG } from "./constants.js";

/**
 * Application state.
 */
export const state = {
    activeRound: "round-1",
    pauseStatus: false,
    isButtonDisable: true,
    matchTime: CONFIG.DEFAULT_MATCH_TIME,
    users: [],
    canSubmit: true,
    userData: null,
    partaiData: null,
    channelOperator: null,
    channelUpdateScore: null,
};
