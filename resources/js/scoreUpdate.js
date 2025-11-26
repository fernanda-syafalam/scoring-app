/**
 * Score Update Module
 * Manages score display updates and round transitions
 * Listens to operator and score update channels to synchronize scoreboard state
 *
 * @fileoverview Handles score display synchronization across rounds
 * @version 2.0.0
 */

import { updateRoundJuri } from "./library/JuriFunc";
import {
    startPertandingan,
    loadDataSaved,
    updateScore,
    activeRound,
    changeScoreElement,
    channelUpdateScore,
    channelOperator,
    userData,
} from "./library/ScoreFunc";

require("./bootstrap");

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Configuration constants
 * @type {Object}
 */
const CONFIG = {
    // Round identifiers
    ROUNDS: {
        ROUND_1: 'round-1',
        ROUND_2: 'round-2',
        ROUND_3: 'round-3'
    },

    // Operator actions
    ACTIONS: {
        START: 'start',
        FINISH: 'finish',
        RESET: 'reset',
        ROUND: 'round',
        PAUSE: 'pause',
        PLAY: 'play'
    },

    // CSS class names
    CSS_CLASSES: {
        GRAY_DEFAULT: 'bg-grayDefault',
        BLUE_DEFAULT: 'bg-blueDefault',
        RED_DEFAULT: 'bg-redDefault',
        SHADOW_INSET: 'shadow-inset-custom'
    },

    // Storage keys
    STORAGE: {
        GELANGGANG_DATA: 'gelanggangData'
    },

    // Element ID suffixes
    ELEMENT_SUFFIXES: {
        BLUE_SCORE: '-blueScore',
        RED_SCORE: '-redScore',
        BLUE_SCORE_DIV: '-blueScore-div',
        RED_SCORE_DIV: '-redScore-div',
        BLUE_INPUT_DIV: '-blueInput-div',
        RED_INPUT_DIV: '-redInput-div'
    },

    // Default values
    DEFAULT_SCORE: 0,
    EMPTY_SCORE: ''
};

/**
 * Element groups for round management
 */
const ELEMENT_GROUPS = [
    'blueScore-div',
    'redScore-div',
    'blueInput-div',
    'redInput-div'
];

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * Application state
 * @type {Object}
 */
const state = {
    currentRound: CONFIG.ROUNDS.ROUND_1,
    blueScoreElement: null,
    redScoreElement: null
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the score update module
 */
function initScoreUpdate() {
    try {
        console.log('🚀 Initializing Score Update Module...');

        // Validate user data
        if (!userData || !userData.gelanggang_id) {
            throw new Error('Invalid user data: missing gelanggang_id');
        }

        // Initialize score elements for round 1
        initializeScoreElements(state.currentRound);

        // Restore previously saved data if available
        if (localStorage.getItem(CONFIG.STORAGE.GELANGGANG_DATA)) {
            console.log('📦 Restoring saved gelanggang data');
            loadDataSaved();
        }

        // Setup WebSocket channels
        setupChannels();

        console.log('✅ Score Update Module initialized successfully');
    } catch (error) {
        console.error('❌ Fatal error initializing score update:', error);
        showError('Failed to initialize score display');
    }
}

/**
 * Initialize score display elements for a specific round
 * @param {string} round - Round identifier (e.g., 'round-1')
 */
function initializeScoreElements(round) {
    try {
        if (!isValidRound(round)) {
            console.warn(`⚠️ Invalid round: ${round}, defaulting to round-1`);
            round = CONFIG.ROUNDS.ROUND_1;
        }

        state.blueScoreElement = getScoreElement(round, 'blue');
        state.redScoreElement = getScoreElement(round, 'red');

        if (!state.blueScoreElement || !state.redScoreElement) {
            throw new Error(`Failed to get score elements for ${round}`);
        }

        // Update ScoreFunc with current elements
        changeScoreElement(state.redScoreElement, state.blueScoreElement);

        console.log(`✅ Score elements initialized for ${round}`);
    } catch (error) {
        console.error('❌ Error initializing score elements:', error);
        throw error;
    }
}

/**
 * Get score element for a specific round and corner
 * @param {string} round - Round identifier
 * @param {string} corner - Corner color ('blue' or 'red')
 * @returns {HTMLElement|null} Score element
 */
function getScoreElement(round, corner) {
    try {
        const suffix = corner === 'blue' ?
            CONFIG.ELEMENT_SUFFIXES.BLUE_SCORE :
            CONFIG.ELEMENT_SUFFIXES.RED_SCORE;

        const elementId = `${round}${suffix}`;
        const element = document.getElementById(elementId);

        if (!element) {
            console.warn(`⚠️ Score element not found: ${elementId}`);
        }

        return element;
    } catch (error) {
        console.error(`❌ Error getting score element for ${round} ${corner}:`, error);
        return null;
    }
}

/**
 * Setup WebSocket channels for real-time communication
 */
function setupChannels() {
    try {
        console.log('📡 Setting up WebSocket channels...');

        // Listen for score updates
        channelUpdateScore.listen(`.updateScore.${userData.gelanggang_id}`, (event) => {
            try {
                console.log('📊 Score update received:', event);
                updateScore(event);
            } catch (error) {
                console.error('❌ Error handling score update:', error);
            }
        });

        // Listen for operator commands
        channelOperator.listen(`.operator.${userData.gelanggang_id}`, (event) => {
            try {
                handleOperatorAction(event);
            } catch (error) {
                console.error('❌ Error handling operator action:', error);
            }
        });

        console.log('✅ WebSocket channels configured');
    } catch (error) {
        console.error('❌ Error setting up channels:', error);
        showError('Failed to setup communication channels');
    }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

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
            startPertandingan(event);
        },
        'finish': () => {
            console.log('✅ Match finished');
            // Keep data displayed for review
        },
        'reset': () => {
            console.log('🔄 Match reset');
            localStorage.clear();
            location.reload();
        },
        'round': () => {
            if (!event.activeRound) {
                console.warn('⚠️ Round change missing activeRound');
                return;
            }
            console.log(`📍 Round changed to: ${event.activeRound}`);
            changeRound(event);
        },
        'pause': () => {
            console.log('⏸️ Match paused');
            // No visual changes needed for score display
        },
        'play': () => {
            console.log('▶️ Match resumed');
            // No visual changes needed for score display
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
// ROUND MANAGEMENT
// ============================================================================

/**
 * Change active round and update UI
 * @param {Object} event - Round change event
 */
function changeRound(event) {
    try {
        if (!event.activeRound || !isValidRound(event.activeRound)) {
            throw new Error(`Invalid round in event: ${event.activeRound}`);
        }

        const newRound = event.activeRound;

        // Update active round display
        if (activeRound && typeof activeRound === 'object' && activeRound.textContent !== undefined) {
            activeRound.textContent = newRound.toUpperCase();
        }

        // Update current round state
        state.currentRound = newRound;

        // Update score elements for new round
        state.blueScoreElement = getScoreElement(newRound, 'blue');
        state.redScoreElement = getScoreElement(newRound, 'red');

        // Update JuriFunc with new round
        updateRoundJuri(newRound);

        // Update ScoreFunc with new elements
        changeScoreElement(state.redScoreElement, state.blueScoreElement);

        // Update localStorage
        updateStoredRound(newRound);

        // Update round visual indicators
        updateRoundIndicators(newRound);

        console.log(`✅ Round changed to: ${newRound}`);
    } catch (error) {
        console.error('❌ Error changing round:', error);
    }
}

/**
 * Update round indicators in UI
 * @param {string} currentRound - Current round identifier
 */
function updateRoundIndicators(currentRound) {
    try {
        const roundMap = {
            [CONFIG.ROUNDS.ROUND_1]: [],
            [CONFIG.ROUNDS.ROUND_2]: [CONFIG.ROUNDS.ROUND_2],
            [CONFIG.ROUNDS.ROUND_3]: [CONFIG.ROUNDS.ROUND_2, CONFIG.ROUNDS.ROUND_3]
        };

        const roundsToActivate = roundMap[currentRound] || [];

        // Deactivate all rounds first
        [CONFIG.ROUNDS.ROUND_2, CONFIG.ROUNDS.ROUND_3].forEach(round => {
            changeColorRound(round, false);
        });

        // Activate appropriate rounds
        roundsToActivate.forEach(round => {
            changeColorRound(round, true);
        });
    } catch (error) {
        console.error('❌ Error updating round indicators:', error);
    }
}

/**
 * Change visual styling for a round
 * @param {string} round - Round identifier
 * @param {boolean} isActive - Whether round is active
 */
function changeColorRound(round, isActive) {
    try {
        if (!isValidRound(round)) {
            console.warn(`⚠️ Invalid round: ${round}`);
            return;
        }

        const blueScore = document.getElementById(`${round}${CONFIG.ELEMENT_SUFFIXES.BLUE_SCORE}`);
        const redScore = document.getElementById(`${round}${CONFIG.ELEMENT_SUFFIXES.RED_SCORE}`);

        ELEMENT_GROUPS.forEach((elementSuffix) => {
            const elementId = `${round}-${elementSuffix}`;
            const element = document.getElementById(elementId);

            if (!element) {
                console.warn(`⚠️ Element not found: ${elementId}`);
                return;
            }

            const isBlueElement = elementSuffix.includes('blue');

            if (isActive) {
                // Activate round styling
                element.classList.remove(CONFIG.CSS_CLASSES.GRAY_DEFAULT);
                element.classList.add(
                    isBlueElement ? CONFIG.CSS_CLASSES.BLUE_DEFAULT : CONFIG.CSS_CLASSES.RED_DEFAULT,
                    CONFIG.CSS_CLASSES.SHADOW_INSET
                );

                // Set initial score to 0
                if (blueScore) blueScore.innerText = CONFIG.DEFAULT_SCORE;
                if (redScore) redScore.innerText = CONFIG.DEFAULT_SCORE;
            } else {
                // Deactivate round styling
                element.classList.add(CONFIG.CSS_CLASSES.GRAY_DEFAULT);
                element.classList.remove(
                    isBlueElement ? CONFIG.CSS_CLASSES.BLUE_DEFAULT : CONFIG.CSS_CLASSES.RED_DEFAULT,
                    CONFIG.CSS_CLASSES.SHADOW_INSET
                );

                // Clear score display
                if (blueScore) blueScore.innerText = CONFIG.EMPTY_SCORE;
                if (redScore) redScore.innerText = CONFIG.EMPTY_SCORE;
            }
        });
    } catch (error) {
        console.error(`❌ Error changing color for ${round}:`, error);
    }
}

/**
 * Update stored round in localStorage
 * @param {string} newRound - New round identifier
 */
function updateStoredRound(newRound) {
    try {
        const storedData = localStorage.getItem(CONFIG.STORAGE.GELANGGANG_DATA);

        if (!storedData) {
            console.warn('⚠️ No gelanggang data in localStorage');
            return;
        }

        const gelanggangData = JSON.parse(storedData);
        gelanggangData.activeRound = newRound;
        localStorage.setItem(CONFIG.STORAGE.GELANGGANG_DATA, JSON.stringify(gelanggangData));

        console.log(`✅ Updated stored round to: ${newRound}`);
    } catch (error) {
        console.error('❌ Error updating stored round:', error);
    }
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Check if round identifier is valid
 * @param {string} round - Round identifier to validate
 * @returns {boolean} Whether round is valid
 */
function isValidRound(round) {
    return Object.values(CONFIG.ROUNDS).includes(round);
}

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
    document.addEventListener('DOMContentLoaded', initScoreUpdate);
} else {
    initScoreUpdate();
}

/**
 * Export for testing and external access
 */
export {
    initScoreUpdate,
    handleOperatorAction,
    changeRound,
    changeColorRound,
    CONFIG,
    state
};
