/**
 * Dewan (Council/Referee) Scoreboard Manager
 * Handles match scoring, penalties, and referee controls
 *
 * @fileoverview Manages the dewan scoreboard interface for live match scoring
 * @version 2.0.0
 */

import {
    activeRound,
    channelOperator,
    channelUpdateScore,
    getDataGelanggang,
    userData,
} from "./library/ScoreFunc";

import {
    cekWinner,
    changeRoundDewan,
    clearIndicator,
    enabledAction,
    handleDropClick,
    handlePenaltyClick,
    handleScoreChange,
    loadDataSave,
    resetDropCounters,
    saveData,
    updateDataScore,
    updatePertandingan,
} from "./library/DewanFunc";

import { showWMPConfirmation } from "./wmpConfirmationModal";

require("./bootstrap");

/**
 * Configuration Constants
 */
const CONFIG = {
    CORNERS: {
        RED: 'red',
        BLUE: 'blue'
    },
    PENALTIES: {
        'teguran-pertama': 'Teguran Pertama',
        'teguran-kedua': 'Teguran Kedua',
        'binaan-pertama': 'Binaan Pertama',
        'binaan-kedua': 'Binaan Kedua',
        'peringatan-pertama': 'Peringatan Pertama',
        'peringatan-kedua': 'Peringatan Kedua',
        'peringatan-ketiga': 'Peringatan Ketiga'
    },
    TIMEOUTS: {
        SAVE_DELAY: 200,
        BROADCAST_DELAY: 200
    },
    STORAGE: {
        DEWAN_DATA: 'dataDewan'
    },
    DROP_SCORES: {
        VALID: 3,
        INVALID: -3
    }
};

/**
 * Button Configurations
 * Maps button IDs to their corresponding handlers
 */
const BUTTON_CONFIG = [
    // RED CORNER PENALTIES
    { id: 'teguran-merah-pertama', corner: CONFIG.CORNERS.RED, type: 'teguran-pertama', action: 'penalty' },
    { id: 'teguran-merah-kedua', corner: CONFIG.CORNERS.RED, type: 'teguran-kedua', action: 'penalty' },
    { id: 'binaan-merah-pertama', corner: CONFIG.CORNERS.RED, type: 'binaan-pertama', action: 'penalty' },
    { id: 'binaan-merah-kedua', corner: CONFIG.CORNERS.RED, type: 'binaan-kedua', action: 'penalty' },
    { id: 'peringatan-merah-pertama', corner: CONFIG.CORNERS.RED, type: 'peringatan-pertama', action: 'penalty' },
    { id: 'peringatan-merah-kedua', corner: CONFIG.CORNERS.RED, type: 'peringatan-kedua', action: 'penalty' },
    { id: 'peringatan-merah-ketiga', corner: CONFIG.CORNERS.RED, type: 'peringatan-ketiga', action: 'disqualify', opponent: CONFIG.CORNERS.BLUE },

    // BLUE CORNER PENALTIES
    { id: 'teguran-biru-pertama', corner: CONFIG.CORNERS.BLUE, type: 'teguran-pertama', action: 'penalty' },
    { id: 'teguran-biru-kedua', corner: CONFIG.CORNERS.BLUE, type: 'teguran-kedua', action: 'penalty' },
    { id: 'binaan-biru-pertama', corner: CONFIG.CORNERS.BLUE, type: 'binaan-pertama', action: 'penalty' },
    { id: 'binaan-biru-kedua', corner: CONFIG.CORNERS.BLUE, type: 'binaan-kedua', action: 'penalty' },
    { id: 'peringatan-biru-pertama', corner: CONFIG.CORNERS.BLUE, type: 'peringatan-pertama', action: 'penalty' },
    { id: 'peringatan-biru-kedua', corner: CONFIG.CORNERS.BLUE, type: 'peringatan-kedua', action: 'penalty' },
    { id: 'peringatan-biru-ketiga', corner: CONFIG.CORNERS.BLUE, type: 'peringatan-ketiga', action: 'disqualify', opponent: CONFIG.CORNERS.RED },

    // DROP SCORES
    { id: 'jatuhan-merah-plus', corner: CONFIG.CORNERS.RED, score: CONFIG.DROP_SCORES.VALID, action: 'score' },
    { id: 'jatuhan-merah-minus', corner: CONFIG.CORNERS.RED, score: CONFIG.DROP_SCORES.INVALID, action: 'score' },
    { id: 'jatuhan-biru-plus', corner: CONFIG.CORNERS.BLUE, score: CONFIG.DROP_SCORES.VALID, action: 'score' },
    { id: 'jatuhan-biru-minus', corner: CONFIG.CORNERS.BLUE, score: CONFIG.DROP_SCORES.INVALID, action: 'score' },

    // DISQUALIFICATIONS
    { id: 'disk-merah', corner: CONFIG.CORNERS.RED, action: 'disqualify', opponent: CONFIG.CORNERS.BLUE },
    { id: 'disk-biru', corner: CONFIG.CORNERS.BLUE, action: 'disqualify', opponent: CONFIG.CORNERS.RED }
];

/**
 * Utility Functions
 */

/**
 * Safely retrieve DOM element with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} DOM element or null if not found
 */
function getElement(id) {
    try {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`⚠️ Element not found: ${id}`);
            return null;
        }
        return element;
    } catch (error) {
        console.error(`❌ Error getting element '${id}':`, error);
        return null;
    }
}

/**
 * Safely attach event listener with error handling
 * @param {HTMLElement} element - Target element
 * @param {string} eventType - Event type (e.g., 'click')
 * @param {Function} handler - Event handler function
 * @returns {boolean} Success status
 */
function attachListener(element, eventType, handler) {
    try {
        if (!element) return false;
        element.addEventListener(eventType, handler);
        return true;
    } catch (error) {
        console.error(`❌ Error attaching ${eventType} listener:`, error);
        return false;
    }
}

/**
 * Debounced save function
 * @type {Function}
 */
let saveTimeout;
function debouncedSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveData();
    }, CONFIG.TIMEOUTS.SAVE_DELAY);
}

/**
 * Channel & Event Listeners
 */

/**
 * Handle score updates from other judges
 */
try {
    channelUpdateScore.listen(`.updateScore.${userData.gelanggang_id}`, (event) => {
        try {
            updateDataScore(event);
            debouncedSave();
        } catch (error) {
            console.error('❌ Error updating score:', error);
        }
    });
} catch (error) {
    console.error('❌ Error setting up score channel:', error);
}

/**
 * Handle operator actions (start, pause, reset, etc.)
 */
try {
    channelOperator.listen(`.operator.${userData.gelanggang_id}`, (event) => {
        try {
            handleOperatorAction(event);
        } catch (error) {
            console.error('❌ Error handling operator action:', error);
        }
    });
} catch (error) {
    console.error('❌ Error setting up operator channel:', error);
}

/**
 * Button Event Handlers
 */

/**
 * Initialize all button listeners based on configuration
 */
function initializeButtons() {
    let successCount = 0;
    let failureCount = 0;

    BUTTON_CONFIG.forEach((config) => {
        const element = getElement(config.id);
        if (!element) {
            failureCount++;
            return;
        }

        try {
            const handler = getHandlerForConfig(config);
            if (attachListener(element, 'click', handler)) {
                successCount++;
            } else {
                failureCount++;
            }
        } catch (error) {
            console.error(`❌ Error initializing button ${config.id}:`, error);
            failureCount++;
        }
    });

    console.log(`✅ Buttons initialized: ${successCount} succeeded, ${failureCount} failed`);
}

/**
 * Get appropriate handler based on button configuration
 * @param {Object} config - Button configuration
 * @returns {Function} Event handler function
 */
function getHandlerForConfig(config) {
    switch (config.action) {
        case 'penalty':
            return () => handlePenaltyClick(config.corner, config.type)();

        case 'score':
            // ========================================
            // PERFORMANCE & FEATURE: Distinguish drops from regular scores
            // ========================================
            // Drop buttons have score values of ±3 (CONFIG.DROP_SCORES.VALID/INVALID)
            // Regular scores are ±1, ±2
            if (Math.abs(config.score) === 3) {
                // This is a DROP button - use optimized drop handler
                const increment = config.score > 0 ? 1 : -1;
                return () => handleDropClick(config.corner)(increment);
            } else {
                // Regular score button - use standard handler
                return () => handleScoreChange(config.corner, config.score)();
            }

        case 'disqualify':
            return () => handleDisqualification(config.opponent);

        default:
            console.warn(`⚠️ Unknown action: ${config.action}`);
            return () => {};
    }
}

/**
 * Handle disqualification action (WMP button click)
 * Shows confirmation modal instead of directly declaring winner
 * @param {string} winner - Winner corner ('red' or 'blue')
 */
function handleDisqualification(winner) {
    try {
        // Convert corner to Indonesian format (merah/biru)
        const winnerCorner = winner === CONFIG.CORNERS.RED ? 'merah' : 'biru';

        // Show WMP confirmation modal
        showWMPConfirmation(winnerCorner);

        console.log(`📋 WMP confirmation modal shown for ${winnerCorner}`);
    } catch (error) {
        console.error('❌ Error handling disqualification:', error);
    }
}

/**
 * Operator Action Handler
 */

/**
 * Handle broadcast actions from operator
 * @param {Object} event - Operator action event
 * @throws {Error} If event is invalid
 */
function handleOperatorAction(event) {
    // Input validation
    if (!event || typeof event !== 'object') {
        console.error('❌ Invalid event received:', event);
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
            saveData();
        },
        'finish': () => {
            console.log('✅ Match finished');
            localStorage.removeItem(CONFIG.STORAGE.DEWAN_DATA);
            cekWinner();
        },
        'round': () => {
            if (!event.activeRound) {
                console.warn('⚠️ Round change missing activeRound');
                return;
            }
            console.log(`📍 Round changed to: ${event.activeRound}`);
            enabledAction(false);
            clearIndicator();
            resetDropCounters();  // ✅ Reset drop tracking for new round
            changeRoundDewan(event.activeRound);
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
            localStorage.removeItem(CONFIG.STORAGE.DEWAN_DATA);
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

/**
 * Initialization
 */

/**
 * Initialize the dewan scoreboard
 */
function initDewanScoreboard() {
    try {
        console.log('🚀 Initializing Dewan Scoreboard...');

        // Enable actions by default
        enabledAction(true);

        // Restore previously saved data if available
        if (localStorage.getItem(CONFIG.STORAGE.DEWAN_DATA)) {
            console.log('📦 Restoring saved data');
            loadDataSave();
        }

        // Initialize all button listeners
        initializeButtons();

        console.log('✅ Dewan Scoreboard initialized successfully');
    } catch (error) {
        console.error('❌ Fatal error initializing dewan scoreboard:', error);
    }
}

/**
 * Start application when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDewanScoreboard);
} else {
    initDewanScoreboard();
}

/**
 * Export for testing and external access
 */
export {
    initDewanScoreboard,
    handleOperatorAction,
    handleDisqualification,
    getHandlerForConfig,
    CONFIG,
    BUTTON_CONFIG
};
