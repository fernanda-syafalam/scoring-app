/**
 * WMP Confirmation Modal Module
 * Handles the intermediate confirmation modal for winner declaration
 * Shows winner info and allows selection of win method (Teknik/Diskualifikasi)
 *
 * @fileoverview Manages WMP confirmation dialog in Dewan interface
 * @version 1.0.0
 */

import { getDataGelanggang, activeRound } from "./library/ScoreFunc";

// ============================================================================
// CONSTANTS
// ============================================================================

const CONFIG = {
    CSS_CLASSES: {
        HIDDEN: 'hidden'
    },
    ELEMENTS: {
        MODAL: 'wmp-confirmation-modal',
        WINNER_NAME: 'wmp-winner-name',
        WINNER_CORNER: 'wmp-winner-corner',
        WINNER_CONTINGENT: 'wmp-winner-contingent',
        BTN_TEKNIK: 'wmp-btn-teknik',
        BTN_DISKUALIFIKASI: 'wmp-btn-diskualifikasi',
        BTN_CANCEL: 'wmp-btn-cancel'
    },
    WIN_METHODS: {
        TEKNIK: 'Teknik',
        DISKUALIFIKASI: 'Diskualifikasi'
    },
    CORNERS: {
        RED: 'merah',
        BLUE: 'biru'
    },
    CORNER_LABELS: {
        merah: 'Merah',
        biru: 'Biru'
    },
    ENDPOINTS: {
        WINNER: '/winner'
    }
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const elements = {
    modal: null,
    winnerName: null,
    winnerCorner: null,
    winnerContingent: null,
    btnTeknik: null,
    btnDiskualifikasi: null,
    btnCancel: null
};

let currentWinner = null; // Stores current winner corner ('merah' or 'biru')

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize WMP confirmation modal
 */
function initWMPConfirmationModal() {
    try {
        console.log('🚀 Initializing WMP Confirmation Modal...');

        if (!cacheElements()) {
            throw new Error('Failed to cache required DOM elements');
        }

        setupEventListeners();

        console.log('✅ WMP Confirmation Modal initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing WMP confirmation modal:', error);
    }
}

/**
 * Cache all required DOM elements
 * @returns {boolean} Success status
 */
function cacheElements() {
    try {
        elements.modal = document.getElementById(CONFIG.ELEMENTS.MODAL);
        elements.winnerName = document.getElementById(CONFIG.ELEMENTS.WINNER_NAME);
        elements.winnerCorner = document.getElementById(CONFIG.ELEMENTS.WINNER_CORNER);
        elements.winnerContingent = document.getElementById(CONFIG.ELEMENTS.WINNER_CONTINGENT);
        elements.btnTeknik = document.getElementById(CONFIG.ELEMENTS.BTN_TEKNIK);
        elements.btnDiskualifikasi = document.getElementById(CONFIG.ELEMENTS.BTN_DISKUALIFIKASI);
        elements.btnCancel = document.getElementById(CONFIG.ELEMENTS.BTN_CANCEL);

        const required = [
            elements.modal,
            elements.winnerName,
            elements.winnerCorner,
            elements.winnerContingent,
            elements.btnTeknik,
            elements.btnDiskualifikasi,
            elements.btnCancel
        ];

        const allPresent = required.every(el => el !== null);
        if (!allPresent) {
            console.warn('⚠️ Some WMP confirmation modal elements are missing');
        }

        return allPresent;
    } catch (error) {
        console.error('❌ Error caching elements:', error);
        return false;
    }
}

/**
 * Setup event listeners for modal buttons
 */
function setupEventListeners() {
    try {
        if (elements.btnTeknik) {
            elements.btnTeknik.addEventListener('click', () => handleWinMethodSelect(CONFIG.WIN_METHODS.TEKNIK));
        }
        if (elements.btnDiskualifikasi) {
            elements.btnDiskualifikasi.addEventListener('click', () => handleWinMethodSelect(CONFIG.WIN_METHODS.DISKUALIFIKASI));
        }
        if (elements.btnCancel) {
            elements.btnCancel.addEventListener('click', hideModal);
        }

        console.log('✅ WMP modal event listeners attached');
    } catch (error) {
        console.error('❌ Error setting up event listeners:', error);
    }
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Show WMP confirmation modal with winner information
 * @param {string} corner - Winner corner ('merah' or 'biru')
 * @export
 */
export function showWMPConfirmation(corner) {
    try {
        if (!corner || (corner !== CONFIG.CORNERS.RED && corner !== CONFIG.CORNERS.BLUE)) {
            console.error('❌ Invalid corner:', corner);
            return;
        }

        currentWinner = corner;

        // Get match data
        const dataPartai = getDataGelanggang();
        if (!dataPartai) {
            console.error('❌ Failed to get match data');
            return;
        }

        // Extract winner info based on corner
        const winnerName = corner === CONFIG.CORNERS.RED ? dataPartai.namaMerah : dataPartai.namaBiru;
        const winnerContingent = corner === CONFIG.CORNERS.RED ? dataPartai.kontingenMerah : dataPartai.kontingenBiru;
        const cornerLabel = CONFIG.CORNER_LABELS[corner];

        // Update modal content
        if (elements.winnerName) elements.winnerName.textContent = winnerName || '-';
        if (elements.winnerCorner) elements.winnerCorner.textContent = cornerLabel || '-';
        if (elements.winnerContingent) elements.winnerContingent.textContent = winnerContingent || '-';

        // Show modal
        showModal();

        console.log(`✅ WMP confirmation shown for ${cornerLabel} corner`);
    } catch (error) {
        console.error('❌ Error showing WMP confirmation:', error);
    }
}

// ============================================================================
// MODAL CONTROL
// ============================================================================

/**
 * Show modal
 */
function showModal() {
    try {
        if (!elements.modal) {
            console.warn('⚠️ Modal element not found');
            return;
        }

        elements.modal.classList.remove(CONFIG.CSS_CLASSES.HIDDEN);
    } catch (error) {
        console.error('❌ Error showing modal:', error);
    }
}

/**
 * Hide modal
 */
function hideModal() {
    try {
        if (!elements.modal) {
            console.warn('⚠️ Modal element not found');
            return;
        }

        elements.modal.classList.add(CONFIG.CSS_CLASSES.HIDDEN);
        currentWinner = null;
    } catch (error) {
        console.error('❌ Error hiding modal:', error);
    }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Handle win method selection (Teknik or Diskualifikasi)
 * @param {string} winMethod - Selected win method
 */
function handleWinMethodSelect(winMethod) {
    try {
        if (!currentWinner) {
            console.error('❌ No winner selected');
            return;
        }

        console.log(`🏆 Win method selected: ${winMethod} for ${currentWinner}`);

        // Get final scores
        const scores = getFinalScores();

        // Get match data
        const dataPartai = getDataGelanggang();

        // Prepare winner data
        const winnerData = {
            winner: currentWinner,
            winMethod: winMethod,
            winnerName: currentWinner === CONFIG.CORNERS.RED ? dataPartai.namaMerah : dataPartai.namaBiru,
            winnerCorner: CONFIG.CORNER_LABELS[currentWinner],
            winnerContingent: currentWinner === CONFIG.CORNERS.RED ? dataPartai.kontingenMerah : dataPartai.kontingenBiru,
            redScore: scores.red,
            blueScore: scores.blue,
            redName: dataPartai.namaMerah,
            blueName: dataPartai.namaBiru,
            redContingent: dataPartai.kontingenMerah,
            blueContingent: dataPartai.kontingenBiru,
            babak: dataPartai.babak,
            activeRound: activeRound?.textContent || 'round-1'
        };

        // Send to backend
        broadcastWinner(winnerData);

        // Hide modal
        hideModal();

        // Clear localStorage
        localStorage.clear();

    } catch (error) {
        console.error('❌ Error handling win method selection:', error);
    }
}

/**
 * Get final scores from current round
 * @returns {Object} Final scores {red: number, blue: number}
 */
function getFinalScores() {
    try {
        const round = activeRound?.textContent || 'round-1';
        const redScoreElement = document.getElementById(`${round}-redScore`);
        const blueScoreElement = document.getElementById(`${round}-blueScore`);

        const redScore = parseInt(redScoreElement?.textContent || '0');
        const blueScore = parseInt(blueScoreElement?.textContent || '0');

        return {
            red: isNaN(redScore) ? 0 : redScore,
            blue: isNaN(blueScore) ? 0 : blueScore
        };
    } catch (error) {
        console.error('❌ Error getting final scores:', error);
        return { red: 0, blue: 0 };
    }
}

/**
 * Broadcast winner to all clients
 * @param {Object} winnerData - Winner information
 */
function broadcastWinner(winnerData) {
    try {
        console.log('📤 Broadcasting winner:', winnerData);

        axios.post(CONFIG.ENDPOINTS.WINNER, {
            message: {
                name: winnerData.winnerName,
                corner: winnerData.winnerCorner,
                contingent: winnerData.winnerContingent,
                winMethod: winnerData.winMethod,
                redScore: winnerData.redScore,
                blueScore: winnerData.blueScore,
                redName: winnerData.redName,
                blueName: winnerData.blueName,
                redContingent: winnerData.redContingent,
                blueContingent: winnerData.blueContingent,
                babak: winnerData.babak,
                activeRound: winnerData.activeRound
            }
        })
        .then(() => {
            console.log('✅ Winner broadcast successful');
        })
        .catch((error) => {
            console.error('❌ Error broadcasting winner:', error);
        });
    } catch (error) {
        console.error('❌ Error in broadcastWinner:', error);
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWMPConfirmationModal);
} else {
    initWMPConfirmationModal();
}

/**
 * Export for external access
 */
export {
    initWMPConfirmationModal,
    showWMPConfirmation as default,
    CONFIG
};
