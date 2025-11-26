/**
 * Winner Modal Module
 * Displays winner announcement modal with auto-dismiss functionality
 * Listens to winner channel and shows modal with winner information
 *
 * @fileoverview Manages winner announcement modal across all viewing interfaces
 * @version 2.0.0
 */

import "./bootstrap";

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Configuration constants
 * @type {Object}
 */
const CONFIG = {
    // CSS classes
    CSS_CLASSES: {
        HIDDEN: 'hidden'
    },

    // Timeouts
    TIMEOUTS: {
        AUTO_DISMISS: 5000 // 5 seconds
    },

    // Element IDs
    ELEMENTS: {
        USER: 'user',
        MODAL_WINNER: 'modal-winner',
        WINNER_NAME: 'winner',
        WINNER_CORNER: 'corner',
        WINNER_CONTINGENT: 'contingent',
        DONE_BUTTON: 'done-button'
    }
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * DOM elements cache
 * @type {Object}
 */
const elements = {
    userElement: null,
    modalWinner: null,
    winner: null,
    corner: null,
    contingent: null,
    doneButton: null
};

/**
 * User data extracted from DOM
 * @type {Object}
 */
let userData = null;

/**
 * WebSocket channel for winner announcements
 * @type {Object}
 */
let channelWinner = null;

/**
 * Timeout ID for auto-dismiss functionality
 * @type {number}
 */
let autoDismissTimeout = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the winner modal module
 */
function initWinnerModal() {
    try {
        console.log('🚀 Initializing Winner Modal Module...');

        // Cache DOM elements
        if (!cacheElements()) {
            throw new Error('Failed to cache required DOM elements');
        }

        // Extract user data
        userData = extractUserData();
        if (!userData?.gelanggang_id) {
            throw new Error('Invalid user data: missing gelanggang_id');
        }

        // Setup WebSocket channel
        setupChannel();

        // Setup event listeners
        setupEventListeners();

        console.log('✅ Winner Modal Module initialized successfully');
    } catch (error) {
        console.error('❌ Fatal error initializing winner modal:', error);
        showError('Failed to initialize winner modal');
    }
}

/**
 * Cache all required DOM elements
 * @returns {boolean} Success status
 */
function cacheElements() {
    try {
        elements.userElement = document.getElementById(CONFIG.ELEMENTS.USER);
        elements.modalWinner = document.getElementById(CONFIG.ELEMENTS.MODAL_WINNER);
        elements.winner = document.getElementById(CONFIG.ELEMENTS.WINNER_NAME);
        elements.corner = document.getElementById(CONFIG.ELEMENTS.WINNER_CORNER);
        elements.contingent = document.getElementById(CONFIG.ELEMENTS.WINNER_CONTINGENT);
        elements.doneButton = document.getElementById(CONFIG.ELEMENTS.DONE_BUTTON);

        // Verify required elements exist
        const required = [
            elements.userElement,
            elements.modalWinner,
            elements.winner,
            elements.corner,
            elements.contingent,
            elements.doneButton
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
        if (!elements.userElement) {
            throw new Error('User element not found');
        }

        const data = JSON.parse(elements.userElement.getAttribute("data-user"));

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
 * Setup WebSocket channel for winner announcements
 */
function setupChannel() {
    try {
        console.log('📡 Setting up winner channel...');

        channelWinner = Echo.join(`presence.winner.${userData.gelanggang_id}`);

        channelWinner.listen(`.winner.${userData.gelanggang_id}`, (event) => {
            try {
                handleWinnerAnnouncement(event);
            } catch (error) {
                console.error('❌ Error handling winner announcement:', error);
            }
        });

        console.log('✅ Winner channel configured');
    } catch (error) {
        console.error('❌ Error setting up winner channel:', error);
        showError('Failed to setup winner channel');
    }
}

/**
 * Setup UI event listeners
 */
function setupEventListeners() {
    try {
        if (elements.doneButton) {
            elements.doneButton.addEventListener('click', handleDismiss);
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
 * Handle winner announcement event
 * @param {Object} event - Winner announcement event
 */
function handleWinnerAnnouncement(event) {
    // Input validation
    if (!event || typeof event !== 'object') {
        console.error('❌ Invalid winner event:', event);
        return;
    }

    if (!event.data || typeof event.data !== 'object') {
        console.error('❌ Winner event missing data property:', event);
        return;
    }

    const { name, corner, contingent } = event.data;

    // Validate required properties
    if (!name || !corner || !contingent) {
        console.warn('⚠️ Winner data missing required properties:', event.data);
        return;
    }

    try {
        console.log('🏆 Winner announcement received:', { name, corner, contingent });

        // Update modal content
        if (elements.winner) elements.winner.innerText = name;
        if (elements.corner) elements.corner.innerText = corner;
        if (elements.contingent) elements.contingent.innerText = contingent;

        // Show modal
        showModal();

        // Setup auto-dismiss
        setupAutoDismiss();

    } catch (error) {
        console.error('❌ Error displaying winner announcement:', error);
    }
}

/**
 * Handle manual dismiss button click
 */
function handleDismiss() {
    try {
        clearAutoDismiss();
        hideModal();
    } catch (error) {
        console.error('❌ Error dismissing modal:', error);
    }
}

// ============================================================================
// MODAL CONTROL
// ============================================================================

/**
 * Show winner modal
 */
function showModal() {
    try {
        if (!elements.modalWinner) {
            console.warn('⚠️ Modal element not found');
            return;
        }

        elements.modalWinner.classList.remove(CONFIG.CSS_CLASSES.HIDDEN);
        console.log('✅ Winner modal displayed');
    } catch (error) {
        console.error('❌ Error showing modal:', error);
    }
}

/**
 * Hide winner modal
 */
function hideModal() {
    try {
        if (!elements.modalWinner) {
            console.warn('⚠️ Modal element not found');
            return;
        }

        elements.modalWinner.classList.add(CONFIG.CSS_CLASSES.HIDDEN);
        console.log('✅ Winner modal hidden');
    } catch (error) {
        console.error('❌ Error hiding modal:', error);
    }
}

/**
 * Setup auto-dismiss timeout
 */
function setupAutoDismiss() {
    try {
        // Clear any existing timeout
        clearAutoDismiss();

        // Set new timeout
        autoDismissTimeout = setTimeout(() => {
            hideModal();
            console.log('⏱️ Modal auto-dismissed');
        }, CONFIG.TIMEOUTS.AUTO_DISMISS);

    } catch (error) {
        console.error('❌ Error setting up auto-dismiss:', error);
    }
}

/**
 * Clear auto-dismiss timeout
 */
function clearAutoDismiss() {
    try {
        if (autoDismissTimeout !== null) {
            clearTimeout(autoDismissTimeout);
            autoDismissTimeout = null;
        }
    } catch (error) {
        console.error('❌ Error clearing auto-dismiss:', error);
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
    document.addEventListener('DOMContentLoaded', initWinnerModal);
} else {
    initWinnerModal();
}

/**
 * Export for testing and external access
 */
export {
    initWinnerModal,
    handleWinnerAnnouncement,
    handleDismiss,
    showModal,
    hideModal,
    CONFIG
};
