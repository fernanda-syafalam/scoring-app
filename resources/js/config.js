/**
 * Application Configuration
 * Centralized configuration for the scoring application
 * Single source of truth for all constants, timeouts, and settings
 *
 * @module config
 * @version 1.0.0
 */

// ============================================================================
// WEBSOCKET CONFIGURATION
// ============================================================================

export const WEBSOCKET = {
    // Connection settings
    PORT: 6001,
    HOST: window.location.hostname,

    // Reconnection strategy
    RECONNECT_ATTEMPTS: 10,
    RECONNECT_BASE_DELAY: 1000, // ms
    RECONNECT_MAX_DELAY: 30000, // ms

    // Heartbeat settings
    HEARTBEAT_INTERVAL: 15000, // ms
    HEARTBEAT_IDLE_INTERVAL: 60000, // ms when idle
    IDLE_THRESHOLD: 60000, // ms - consider idle after 1 minute

    // Latency monitoring
    LATENCY_WARNING_THRESHOLD: 500, // ms
    LATENCY_CRITICAL_THRESHOLD: 1000, // ms
};

// ============================================================================
// TIMER CONFIGURATION
// ============================================================================

export const TIMERS = {
    // Auto-undo timeout for judge scoring
    AUTO_UNDO: 2000, // ms

    // Debounce delays
    DEBOUNCE_SCORE: 150, // ms
    DEBOUNCE_SAVE: 200, // ms
    DEBOUNCE_BROADCAST: 200, // ms

    // Auto-dismiss for modals
    AUTO_DISMISS_WINNER: 5000, // ms

    // Timer update interval
    COUNTDOWN_UPDATE: 1000, // ms

    // Indicator timeout
    INDICATOR_TIMEOUT: 2000, // ms
};

// ============================================================================
// ROUND CONFIGURATION
// ============================================================================

export const ROUNDS = {
    // Round identifiers
    IDS: ['round-1', 'round-2', 'round-3'],

    // Round durations (in seconds)
    DURATIONS: {
        satu: 90,    // Round 1: 1.5 minutes
        dua: 120,    // Round 2: 2.0 minutes
        tiga: 150,   // Round 3: 2.5 minutes
        empat: 180,  // Round 4: 3.0 minutes
    },

    // Round names in Indonesian
    NAMES: {
        'round-1': 'Babak 1',
        'round-2': 'Babak 2',
        'round-3': 'Babak 3',
    },

    // Default round
    DEFAULT: 'round-1',

    // Default timer duration
    DEFAULT_DURATION: 120, // seconds
};

// ============================================================================
// SCORING CONFIGURATION
// ============================================================================

export const SCORING = {
    // Point values
    POINTS: {
        PUNCH: 1,
        KICK: 2,
    },

    // Drop/knockdown scores
    DROP: {
        VALID: 3,
        INVALID: -3,
        MAX_PER_ROUND: 5,
    },

    // Penalty point deductions
    PENALTIES: {
        'pertama': 0,
        'binaan-pertama': 0,
        'binaan-kedua': 0,
        'teguran-pertama': 1,
        'teguran-kedua': 2,
        'peringatan-pertama': 5,
        'peringatan-kedua': 10,
        'peringatan-ketiga': 0, // Disqualification
    },

    // Consensus timing (judge agreement window)
    CONSENSUS_WINDOW: 2000, // ms

    // Minimum judges required
    MIN_JUDGES: 1,
};

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
    // Match data
    GELANGGANG_DATA: 'gelanggangData',
    SCORE_DATA: 'scoreData',

    // Role-specific data
    JURI_DATA: 'dataJuriScoring',
    DEWAN_DATA: 'dataDewan',
    KETUA_DATA: 'dataKetuaPertandingan',

    // Timer state
    TIMER_STARTED: 'timerStarted',
    TIMER_PAUSED: 'timerIsPaused',
    TIMER_SECONDS: 'timerSecondsRemaining',
    TIMER_END_TIME: 'timerEndTime',

    // Temporary consensus data
    CONSENSUS_PREFIX: 'consensus_',
};

// ============================================================================
// OPERATOR ACTIONS
// ============================================================================

export const ACTIONS = {
    START: 'start',
    FINISH: 'finish',
    RESET: 'reset',
    ROUND: 'round',
    PAUSE: 'pause',
    PLAY: 'play',
    ROUND_DONE: 'round-done',
};

// ============================================================================
// CSS CLASSES
// ============================================================================

export const CSS_CLASSES = {
    // Colors
    GRAY_DEFAULT: 'bg-grayDefault',
    GRAY_DARK: 'bg-grayDark',
    GRAY_200: 'bg-gray-200',
    BLUE_DEFAULT: 'bg-blueDefault',
    RED_DEFAULT: 'bg-redDefault',
    YELLOW_DEFAULT: 'bg-yellowDefault',

    // States
    HIDDEN: 'hidden',
    SHADOW_INSET: 'shadow-inset-custom',
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const ENDPOINTS = {
    // Match control
    OPERATOR_UPDATE: '/operator-update',
    SCORE_EVENT: '/score-event',
    SCORE_UPDATE: '/score-update',

    // Ketua pertandingan
    KETUA_UPDATE: '/ketua-pertandingan-update',

    // Winner
    WINNER: '/winner',

    // Drop verification
    DROP_VERIFICATION: '/drop-verification',

    // Screenshot
    SCREENSHOT: '/capture-screenshot',
};

// ============================================================================
// USER ROLES
// ============================================================================

export const ROLES = {
    OPERATOR: 1,
    KETUA_PERTANDINGAN: 2,
    DEWAN: 3,
    JURI_PERTAMA: 4,
    JURI_KEDUA: 5,
    JURI_KETIGA: 6,

    // Role names
    NAMES: {
        1: 'Operator',
        2: 'Ketua Pertandingan',
        3: 'Dewan',
        4: 'Juri Pertama',
        5: 'Juri Kedua',
        6: 'Juri Ketiga',
    },

    // Tracked roles for presence
    TRACKED: [1, 2, 3, 4, 5, 6],
};

// ============================================================================
// WINNER TYPES
// ============================================================================

export const WINNERS = {
    RED: 'merah',
    BLUE: 'biru',
    DRAW: 'draw', // Reserved for future use

    // Corner names
    CORNERS: {
        RED: 'red',
        BLUE: 'blue',
    },
};

// ============================================================================
// LOGGING CONFIGURATION
// ============================================================================

export const LOGGING = {
    // Log levels
    LEVELS: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3,
    },

    // Environment-based logging
    getLogLevel() {
        const env = this.getEnvironment();
        return env === 'production' ? this.LEVELS.ERROR : this.LEVELS.INFO;
    },

    // Environment detection
    getEnvironment() {
        // Check webpack/Laravel Mix
        if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
            return process.env.NODE_ENV;
        }

        // Check Vite
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE) {
            return import.meta.env.MODE;
        }

        // Check hostname
        if (typeof window !== 'undefined' && window.location) {
            const hostname = window.location.hostname;
            if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
                return 'development';
            }
        }

        return 'production';
    },
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
    // Score limits
    MAX_SCORE: 999,
    MIN_SCORE: 0,

    // Input validation
    MAX_MESSAGE_LENGTH: 500,
    MAX_NAME_LENGTH: 100,

    // Timeouts
    REQUEST_TIMEOUT: 10000, // ms
};

// ============================================================================
// UI CONFIGURATION
// ============================================================================

export const UI = {
    // Notification settings
    NOTIFICATION: {
        DURATION: 4000, // ms
        MAX_VISIBLE: 5,
        POSITION: 'top-right',
    },

    // Animation durations
    ANIMATION: {
        FADE: 300, // ms
        SLIDE: 300, // ms
        QUICK: 150, // ms
    },

    // Button states
    BUTTON: {
        DISABLE_DELAY: 100, // ms to prevent double-click
    },
};

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
    // Enable/disable features
    ENABLE_SCREENSHOTS: true,
    ENABLE_DROP_VERIFICATION: true,
    ENABLE_PERFORMANCE_MONITOR: true,
    ENABLE_WEBSOCKET_MONITOR: true,

    // Debug features (auto-disable in production)
    ENABLE_DEBUG_LOGGING: LOGGING.getEnvironment() !== 'production',
    ENABLE_VERBOSE_ERRORS: LOGGING.getEnvironment() !== 'production',
};

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULTS = {
    // Score defaults
    SCORE: 0,
    PENALTY: 'pertama',

    // Match defaults
    MATCH_DATA: {
        namaMerah: 'Sudut Merah',
        kontingenMerah: 'Kontingen',
        namaBiru: 'Sudut Biru',
        kontingenBiru: 'Kontingen',
        babak: 'BABAK',
        activeRound: 'ROUND',
    },

    // Score data defaults
    SCORE_DATA: {
        redScore: 0,
        blueScore: 0,
        bluePenalty: 'pertama',
        redPenalty: 'pertama',
    },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if environment is production
 * @returns {boolean}
 */
export function isProduction() {
    return LOGGING.getEnvironment() === 'production';
}

/**
 * Check if environment is development
 * @returns {boolean}
 */
export function isDevelopment() {
    return LOGGING.getEnvironment() === 'development';
}

/**
 * Get current log level
 * @returns {number}
 */
export function getLogLevel() {
    return LOGGING.getLogLevel();
}

/**
 * Check if a round ID is valid
 * @param {string} roundId - Round identifier
 * @returns {boolean}
 */
export function isValidRound(roundId) {
    return ROUNDS.IDS.includes(roundId);
}

/**
 * Get round duration in seconds
 * @param {string} roundName - Round name (satu, dua, tiga, empat)
 * @returns {number} Duration in seconds
 */
export function getRoundDuration(roundName) {
    return ROUNDS.DURATIONS[roundName] || ROUNDS.DEFAULT_DURATION;
}

/**
 * Format time in MM:SS
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time
 */
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Default export - all configuration
 */
export default {
    WEBSOCKET,
    TIMERS,
    ROUNDS,
    SCORING,
    STORAGE_KEYS,
    ACTIONS,
    CSS_CLASSES,
    ENDPOINTS,
    ROLES,
    WINNERS,
    LOGGING,
    VALIDATION,
    UI,
    FEATURES,
    DEFAULTS,

    // Helper functions
    isProduction,
    isDevelopment,
    getLogLevel,
    isValidRound,
    getRoundDuration,
    formatTime,
};
