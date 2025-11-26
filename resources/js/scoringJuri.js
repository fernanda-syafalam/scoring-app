/**
 * Juri (Judge) Scoring Module
 * Handles real-time scoring for judges during martial arts matches
 * Judges can record punches (1 point) and kicks (2 points) for both blue and red corners
 *
 * @fileoverview Manages judge scoring interface with auto-undo functionality and real-time sync
 * @version 2.0.0
 */

import {
    channelOperator,
    channelUpdateScore
} from "./library/ScoreFunc";

import {
    changeRoundJuri,
    enabledAction,
    handleAction,
    inputPoint,
    loadDataSaveJuri,
    saveDataJuri,
    startTimeout,
    updateDataScore,
    updateRoundJuri,
    updateScore,
} from "./library/JuriFunc";

require("./bootstrap");

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Configuration constants
 * @type {Object}
 */
const CONFIG = {
    // Action types for scoring
    ACTIONS: {
        PUNCH: 'pukulan',
        KICK: 'tendangan'
    },

    // Point values for each action type
    POINT_VALUES: {
        PUNCH: 1,
        KICK: 2
    },

    // Corner identifiers
    CORNERS: {
        BLUE: 'blue',
        RED: 'red'
    },

    // CSS class names
    CSS_CLASSES: {
        HIDDEN: 'hidden',
        FLEX: 'flex',
        MARGIN_TOP_0: 'mt-[0%]',
        MARGIN_TOP_5: 'mt-[5%]'
    },

    // Storage keys
    STORAGE: {
        JURI_DATA: 'dataJuriScoring'
    },

    // Timing
    TIMEOUTS: {
        SAVE_DELAY: 200
    },

    // UI text
    TEXT: {
        SHOW: 'Lihat',
        HIDE: 'Tutup'
    }
};

/**
 * Input types for score tracking
 * Maps corner and action to specific input identifiers
 */
const INPUT_TYPES = {
    BLUE_PUNCH: 'pukulanblue',
    BLUE_KICK: 'tendanganblue',
    RED_PUNCH: 'pukulanred',
    RED_KICK: 'tendanganred'
};

// ============================================================================
// DOM ELEMENTS CACHE
// ============================================================================

/**
 * DOM elements cache for performance
 * @type {Object}
 */
const elements = {
    user: null,
    header: null,
    visibleHeader: null,
    firstLinePointGroup: null,
    buttons: {
        bluePunch: null,
        blueKick: null,
        redPunch: null,
        redKick: null
    }
};

/**
 * User data extracted from DOM
 * @type {Object}
 */
let userData = null;

/**
 * WebSocket channel for judge communication
 * @type {Object}
 */
let channelGelanggang = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the juri scoring module
 */
function initJuriScoring() {
    try {
        console.log('🚀 Initializing Juri Scoring Module...');

        // Cache DOM elements
        if (!cacheElements()) {
            throw new Error('Failed to cache required DOM elements');
        }

        // Extract user data
        userData = extractUserData();
        if (!userData?.gelanggang_id) {
            throw new Error('Invalid user data: missing gelanggang_id');
        }

        // Setup WebSocket channels
        setupChannels();

        // Disable scoring actions by default (wait for operator to start)
        enabledAction(false);

        // Restore previously saved data if available
        if (localStorage.getItem(CONFIG.STORAGE.JURI_DATA)) {
            console.log('📦 Restoring saved juri data');
            loadDataSaveJuri();
        }

        // Setup event listeners
        setupEventListeners();

        console.log('✅ Juri Scoring Module initialized successfully');
    } catch (error) {
        console.error('❌ Fatal error initializing juri scoring:', error);
        showError('Failed to initialize judge interface');
    }
}

/**
 * Cache all required DOM elements
 * @returns {boolean} Success status
 */
function cacheElements() {
    try {
        elements.user = document.getElementById("user");
        elements.header = document.getElementById("header");
        elements.visibleHeader = document.getElementById("visible-header");
        elements.firstLinePointGroup = document.getElementById("first-line-point-group");
        elements.buttons.bluePunch = document.getElementById("pukul-biru");
        elements.buttons.blueKick = document.getElementById("tendang-biru");
        elements.buttons.redPunch = document.getElementById("pukul-merah");
        elements.buttons.redKick = document.getElementById("tendang-merah");

        // Verify required elements exist
        const required = [
            elements.user,
            elements.header,
            elements.visibleHeader,
            elements.firstLinePointGroup,
            elements.buttons.bluePunch,
            elements.buttons.blueKick,
            elements.buttons.redPunch,
            elements.buttons.redKick
        ];

        const allPresent = required.every(el => el !== null);
        if (!allPresent) {
            console.warn('⚠️ Some required DOM elements are missing');
        }

        return allPresent;
    } catch (error) {
        console.error('❌ Error caching DOM elements:', error);
        return false;
    }
}

/**
 * Extract and validate user data from DOM
 * @returns {Object} User data
 * @throws {Error} If user data is invalid
 */
function extractUserData() {
    try {
        if (!elements.user) {
            throw new Error('User element not found');
        }

        const data = JSON.parse(elements.user.getAttribute("data-user"));

        if (!data || typeof data !== 'object') {
            throw new Error('Invalid user data format');
        }

        if (!data.gelanggang_id) {
            throw new Error('Missing gelanggang_id in user data');
        }

        return data;
    } catch (error) {
        console.error('❌ Failed to extract user data:', error);
        throw error;
    }
}

/**
 * Setup WebSocket channels for real-time communication
 */
function setupChannels() {
    try {
        console.log('📡 Setting up WebSocket channels...');

        // Join judge-specific channel for this arena
        channelGelanggang = Echo.join(`presence.juri.${userData.gelanggang_id}`);

        // Listen for operator commands (start, pause, reset, etc.)
        channelOperator.listen(`.operator.${userData.gelanggang_id}`, (event) => {
            try {
                handleOperatorAction(event);
            } catch (error) {
                console.error('❌ Error handling operator action:', error);
            }
        });

        // Listen for score updates from other judges
        channelUpdateScore.listen(`.updateScore.${userData.gelanggang_id}`, (event) => {
            try {
                updateDataScore(event);
                // Save after a short delay to ensure all updates are processed
                setTimeout(() => {
                    saveDataJuri();
                }, CONFIG.TIMEOUTS.SAVE_DELAY);
            } catch (error) {
                console.error('❌ Error handling score update:', error);
            }
        });

        // Listen for judge-specific scoring events
        channelGelanggang.listen(`.juri.${userData.gelanggang_id}`, (event) => {
            try {
                updateScore(event);
            } catch (error) {
                console.error('❌ Error updating score:', error);
            }
        });

        console.log('✅ WebSocket channels configured');
    } catch (error) {
        console.error('❌ Error setting up channels:', error);
        showError('Failed to setup communication channels');
    }
}

/**
 * Setup UI event listeners
 */
function setupEventListeners() {
    try {
        console.log('⚙️ Setting up event listeners...');

        // Header visibility toggle
        if (elements.visibleHeader) {
            elements.visibleHeader.addEventListener('click', handleHeaderToggle);
        }

        // Blue corner scoring buttons
        if (elements.buttons.bluePunch) {
            elements.buttons.bluePunch.addEventListener('click', handleBluePunch);
        }
        if (elements.buttons.blueKick) {
            elements.buttons.blueKick.addEventListener('click', handleBlueKick);
        }

        // Red corner scoring buttons
        if (elements.buttons.redPunch) {
            elements.buttons.redPunch.addEventListener('click', handleRedPunch);
        }
        if (elements.buttons.redKick) {
            elements.buttons.redKick.addEventListener('click', handleRedKick);
        }

        console.log('✅ Event listeners attached');
    } catch (error) {
        console.error('❌ Error setting up event listeners:', error);
    }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Handle header visibility toggle
 */
function handleHeaderToggle() {
    try {
        if (!elements.header || !elements.visibleHeader || !elements.firstLinePointGroup) {
            console.warn('⚠️ Missing elements for header toggle');
            return;
        }

        const isHidden = elements.header.classList.contains(CONFIG.CSS_CLASSES.HIDDEN);

        if (isHidden) {
            // Show header
            elements.visibleHeader.textContent = CONFIG.TEXT.HIDE;
            elements.header.classList.remove(CONFIG.CSS_CLASSES.HIDDEN);
            elements.header.classList.add(CONFIG.CSS_CLASSES.FLEX);
            elements.firstLinePointGroup.classList.remove(CONFIG.CSS_CLASSES.MARGIN_TOP_0);
            elements.firstLinePointGroup.classList.add(CONFIG.CSS_CLASSES.MARGIN_TOP_5);
        } else {
            // Hide header
            elements.visibleHeader.textContent = CONFIG.TEXT.SHOW;
            elements.header.classList.add(CONFIG.CSS_CLASSES.HIDDEN);
            elements.header.classList.remove(CONFIG.CSS_CLASSES.FLEX);
            elements.firstLinePointGroup.classList.remove(CONFIG.CSS_CLASSES.MARGIN_TOP_5);
            elements.firstLinePointGroup.classList.add(CONFIG.CSS_CLASSES.MARGIN_TOP_0);
        }
    } catch (error) {
        console.error('❌ Error toggling header:', error);
    }
}

/**
 * Handle blue corner punch scoring
 * @param {Event} event - Click event
 */
function handleBluePunch(event) {
    try {
        const corner = CONFIG.CORNERS.BLUE;
        const inputKey = `${corner}Input`;

        startTimeout(
            inputKey,
            INPUT_TYPES.BLUE_PUNCH,
            inputPoint(inputKey, CONFIG.POINT_VALUES.PUNCH, corner),
            corner
        );

        handleAction(event, corner, CONFIG.ACTIONS.PUNCH);
    } catch (error) {
        console.error('❌ Error handling blue punch:', error);
    }
}

/**
 * Handle blue corner kick scoring
 * @param {Event} event - Click event
 */
function handleBlueKick(event) {
    try {
        const corner = CONFIG.CORNERS.BLUE;
        const inputKey = `${corner}Input`;

        startTimeout(
            inputKey,
            INPUT_TYPES.BLUE_KICK,
            inputPoint(inputKey, CONFIG.POINT_VALUES.KICK, corner),
            corner
        );

        handleAction(event, corner, CONFIG.ACTIONS.KICK);
    } catch (error) {
        console.error('❌ Error handling blue kick:', error);
    }
}

/**
 * Handle red corner punch scoring
 * @param {Event} event - Click event
 */
function handleRedPunch(event) {
    try {
        const corner = CONFIG.CORNERS.RED;
        const inputKey = `${corner}Input`;

        startTimeout(
            inputKey,
            INPUT_TYPES.RED_PUNCH,
            inputPoint(inputKey, CONFIG.POINT_VALUES.PUNCH)
        );

        handleAction(event, corner, CONFIG.ACTIONS.PUNCH);
    } catch (error) {
        console.error('❌ Error handling red punch:', error);
    }
}

/**
 * Handle red corner kick scoring
 * @param {Event} event - Click event
 */
function handleRedKick(event) {
    try {
        const corner = CONFIG.CORNERS.RED;
        const inputKey = `${corner}Input`;

        startTimeout(
            inputKey,
            INPUT_TYPES.RED_KICK,
            inputPoint(inputKey, CONFIG.POINT_VALUES.KICK)
        );

        handleAction(event, corner, CONFIG.ACTIONS.KICK);
    } catch (error) {
        console.error('❌ Error handling red kick:', error);
    }
}

/**
 * Handle broadcast actions from operator
 * @param {Object} event - Operator action event
 */
function handleOperatorAction(event) {
    // Input validation
    if (!event || typeof event !== 'object') {
        console.error('❌ Invalid operator event received:', event);
        return;
    }

    const action = event.action?.toLowerCase?.();
    if (!action) {
        console.warn('⚠️ Event missing action property');
        return;
    }

    // Action handlers map
    const actionHandlers = {
        'start': () => {
            console.log('📍 Match started');
            if (event.activeRound) {
                updateRoundJuri(event.activeRound);
            }
        },
        'finish': () => {
            console.log('✅ Match finished');
            // Keep data for review but disable actions
        },
        'round': () => {
            if (!event.activeRound) {
                console.warn('⚠️ Round change missing activeRound');
                return;
            }
            console.log(`📍 Round changed to: ${event.activeRound}`);
            enabledAction(false);
            changeRoundJuri(event.activeRound);
            updateRoundJuri(event.activeRound);
        },
        'pause': () => {
            console.log('⏸️ Match paused');
            enabledAction(false);
        },
        'play': () => {
            console.log('▶️ Match resumed');
            enabledAction(true);
        },
        'reset': () => {
            console.log('🔄 Match reset');
            localStorage.clear();
            location.reload();
        }
    };

    // Execute handler or log unknown action
    const handler = actionHandlers[action];
    if (handler) {
        try {
            handler();
        } catch (error) {
            console.error(`❌ Error executing action '${action}':`, error);
        }
    } else {
        console.warn(`⚠️ Unknown operator action: ${action}`);
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Show error message to user
 * @param {string} message - Error message
 */
function showError(message) {
    console.error('⚠️ Error:', message);
    // TODO: Implement toast notification library
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJuriScoring);
} else {
    initJuriScoring();
}

/**
 * Export for testing and external access
 */
export {
    initJuriScoring,
    handleOperatorAction,
    handleBluePunch,
    handleBlueKick,
    handleRedPunch,
    handleRedKick,
    CONFIG,
    INPUT_TYPES
};
