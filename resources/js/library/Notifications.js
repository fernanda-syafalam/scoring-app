/**
 * Toast Notification System
 * Provides user-friendly notifications for actions, errors, and events
 *
 * @module Notifications
 * @version 1.0.0
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Notification types and their styling
 * @constant {Object}
 */
const NOTIFICATION_TYPES = {
    SUCCESS: {
        icon: '✅',
        bgColor: 'bg-green-500',
        textColor: 'text-white',
        borderColor: 'border-green-600'
    },
    ERROR: {
        icon: '❌',
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        borderColor: 'border-red-600'
    },
    WARNING: {
        icon: '⚠️',
        bgColor: 'bg-yellow-500',
        textColor: 'text-white',
        borderColor: 'border-yellow-600'
    },
    INFO: {
        icon: 'ℹ️',
        bgColor: 'bg-blue-500',
        textColor: 'text-white',
        borderColor: 'border-blue-600'
    }
};

/**
 * Configuration
 * @constant {Object}
 */
const CONFIG = {
    DURATION: 4000, // 4 seconds default
    MAX_NOTIFICATIONS: 5,
    POSITION: 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center
    ANIMATION_DURATION: 300 // ms
};

// ============================================================================
// STATE
// ============================================================================

/**
 * Container element for notifications
 * @type {HTMLElement|null}
 */
let notificationContainer = null;

/**
 * Array of active notifications
 * @type {Array<Object>}
 */
let activeNotifications = [];

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize notification system
 * Creates container element if it doesn't exist
 */
function initializeNotifications() {
    if (notificationContainer) return;

    try {
        // Create container
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.className = getContainerClasses();
        notificationContainer.setAttribute('aria-live', 'polite');
        notificationContainer.setAttribute('aria-atomic', 'true');

        // Append to body
        document.body.appendChild(notificationContainer);

        console.log('✅ Notification system initialized');
    } catch (error) {
        console.error('❌ Failed to initialize notification system:', error);
    }
}

/**
 * Get CSS classes for container based on position
 * @returns {string} CSS classes
 * @private
 */
function getContainerClasses() {
    const baseClasses = 'fixed z-50 flex flex-col gap-2 p-4';

    const positionClasses = {
        'top-right': 'top-0 right-0',
        'top-left': 'top-0 left-0',
        'bottom-right': 'bottom-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'top-center': 'top-0 left-1/2 transform -translate-x-1/2'
    };

    return `${baseClasses} ${positionClasses[CONFIG.POSITION] || positionClasses['top-right']}`;
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Show a success notification
 * @param {string} message - Message to display
 * @param {Object} options - Optional configuration
 * @returns {string} Notification ID
 *
 * @example
 * notify.success('Match started successfully!');
 */
export function success(message, options = {}) {
    return showNotification(message, 'SUCCESS', options);
}

/**
 * Show an error notification
 * @param {string} message - Message to display
 * @param {Object} options - Optional configuration
 * @returns {string} Notification ID
 *
 * @example
 * notify.error('Failed to connect to server');
 */
export function error(message, options = {}) {
    return showNotification(message, 'ERROR', options);
}

/**
 * Show a warning notification
 * @param {string} message - Message to display
 * @param {Object} options - Optional configuration
 * @returns {string} Notification ID
 *
 * @example
 * notify.warning('Connection unstable');
 */
export function warning(message, options = {}) {
    return showNotification(message, 'WARNING', options);
}

/**
 * Show an info notification
 * @param {string} message - Message to display
 * @param {Object} options - Optional configuration
 * @returns {string} Notification ID
 *
 * @example
 * notify.info('Round 2 starting in 30 seconds');
 */
export function info(message, options = {}) {
    return showNotification(message, 'INFO', options);
}

/**
 * Dismiss a specific notification
 * @param {string} notificationId - ID of notification to dismiss
 */
export function dismiss(notificationId) {
    const notification = activeNotifications.find(n => n.id === notificationId);
    if (notification) {
        hideNotification(notification);
    }
}

/**
 * Dismiss all active notifications
 */
export function dismissAll() {
    activeNotifications.forEach(notification => {
        hideNotification(notification);
    });
}

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Show a notification
 * @param {string} message - Message text
 * @param {string} type - Notification type (SUCCESS, ERROR, WARNING, INFO)
 * @param {Object} options - Configuration options
 * @returns {string} Notification ID
 * @private
 */
function showNotification(message, type, options = {}) {
    // Initialize if needed
    if (!notificationContainer) {
        initializeNotifications();
    }

    // Validate message
    if (!message || typeof message !== 'string') {
        console.warn('⚠️ Invalid notification message:', message);
        return null;
    }

    // Check notification limit
    if (activeNotifications.length >= CONFIG.MAX_NOTIFICATIONS) {
        // Remove oldest notification
        hideNotification(activeNotifications[0]);
    }

    try {
        // Create notification object
        const notification = {
            id: generateId(),
            message,
            type,
            duration: options.duration || CONFIG.DURATION,
            persistent: options.persistent || false,
            element: null,
            timeout: null
        };

        // Create DOM element
        notification.element = createNotificationElement(notification);

        // Add to container
        notificationContainer.appendChild(notification.element);

        // Track notification
        activeNotifications.push(notification);

        // Trigger entrance animation
        setTimeout(() => {
            notification.element.classList.add('notification-enter');
        }, 10);

        // Setup auto-dismiss (if not persistent)
        if (!notification.persistent && notification.duration > 0) {
            notification.timeout = setTimeout(() => {
                hideNotification(notification);
            }, notification.duration);
        }

        return notification.id;
    } catch (error) {
        console.error('❌ Error showing notification:', error);
        return null;
    }
}

/**
 * Hide and remove a notification
 * @param {Object} notification - Notification object
 * @private
 */
function hideNotification(notification) {
    if (!notification || !notification.element) return;

    try {
        // Clear timeout
        if (notification.timeout) {
            clearTimeout(notification.timeout);
        }

        // Trigger exit animation
        notification.element.classList.remove('notification-enter');
        notification.element.classList.add('notification-exit');

        // Remove after animation
        setTimeout(() => {
            if (notification.element && notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }

            // Remove from active notifications
            activeNotifications = activeNotifications.filter(n => n.id !== notification.id);
        }, CONFIG.ANIMATION_DURATION);

    } catch (error) {
        console.error('❌ Error hiding notification:', error);
    }
}

/**
 * Create notification DOM element
 * @param {Object} notification - Notification object
 * @returns {HTMLElement} Notification element
 * @private
 */
function createNotificationElement(notification) {
    const typeConfig = NOTIFICATION_TYPES[notification.type];

    // Create container
    const element = document.createElement('div');
    element.className = `notification ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor} border-l-4 rounded shadow-lg p-4 flex items-start gap-3 min-w-[300px] max-w-[400px] notification-initial`;
    element.setAttribute('role', 'alert');

    // Icon
    const icon = document.createElement('span');
    icon.className = 'text-2xl flex-shrink-0';
    icon.textContent = typeConfig.icon;

    // Message
    const messageEl = document.createElement('div');
    messageEl.className = 'flex-1';
    messageEl.textContent = notification.message;

    // Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity';
    closeButton.innerHTML = '✕';
    closeButton.setAttribute('aria-label', 'Close notification');
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });

    // Assemble
    element.appendChild(icon);
    element.appendChild(messageEl);
    element.appendChild(closeButton);

    return element;
}

/**
 * Generate unique ID for notification
 * @returns {string} Unique ID
 * @private
 */
function generateId() {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// CSS INJECTION
// ============================================================================

/**
 * Inject notification styles
 * @private
 */
function injectStyles() {
    // Check if styles already injected
    if (document.getElementById('notification-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'notification-styles';
    styleEl.textContent = `
        .notification-initial {
            opacity: 0;
            transform: translateY(-20px);
            transition: all ${CONFIG.ANIMATION_DURATION}ms ease-out;
        }

        .notification-enter {
            opacity: 1;
            transform: translateY(0);
        }

        .notification-exit {
            opacity: 0;
            transform: translateX(100px);
            transition: all ${CONFIG.ANIMATION_DURATION}ms ease-in;
        }

        #notification-container {
            pointer-events: none;
        }

        #notification-container > * {
            pointer-events: all;
        }
    `;

    document.head.appendChild(styleEl);
}

// Auto-inject styles when module loads
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectStyles);
    } else {
        injectStyles();
    }
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Default export - notification manager object
 */
export default {
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll
};

/**
 * Named exports for direct imports
 */
export const notify = {
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll
};
