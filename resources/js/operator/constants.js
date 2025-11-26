/**
 * Configuration constants for the Operator Module.
 */
export const CONFIG = {
    ACTIONS: {
        START: "start",
        FINISH: "finish",
        PAUSE: "pause",
        PLAY: "play",
        RESET: "reset",
        ROUND: "round",
        ROUND_DONE: "round-done",
        WINNER_RED: "merah",
        WINNER_BLUE: "biru",
    },
    COLORS: {
        YELLOW: "bg-yellowDefault",
        GRAY: "bg-grayDark",
        GRAY_LIGHT: "bg-gray-200",
    },
    STORAGE: {
        OPERATOR_DATA: "dataOperator",
    },
    DEFAULT_MATCH_TIME: 120,
    ROUNDS: ["round-1", "round-2", "round-3"],
    MAX_ROUNDS: 3,
    ENDPOINTS: {
        OPERATOR_UPDATE: "/operator-update",
        WINNER: "/winner",
    },
};

export const ROLE_IDS = {
    2: "operator",
    3: "ketua",
    4: "dewan",
    5: "juri_pertama",
    6: "juri_kedua",
    7: "juri_ketiga",
};

export const TRACKED_ROLES = [
    "ketua",
    "dewan",
    "juri_pertama",
    "juri_kedua",
    "juri_ketiga",
];
