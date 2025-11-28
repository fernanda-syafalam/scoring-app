/**
 * Performance Monitoring Component
 * Tracks WebSocket health, latency, and connection status across all roles
 * Provides real-time dashboard for operators and administrators
 *
 * @module PerformanceMonitor
 * @version 1.0.0
 */

import { WEBSOCKET, ROLES, FEATURES } from '../config.js';

// ============================================================================
// CONSTANTS
// ============================================================================

const CONFIG = {
    // Update intervals
    UPDATE_INTERVAL: 5000, // Update dashboard every 5 seconds
    CLEANUP_INTERVAL: 60000, // Clean old data every minute

    // Data retention
    HISTORY_LIMIT: 100, // Keep last 100 data points
    EVENT_LOG_LIMIT: 50, // Keep last 50 events

    // Health thresholds
    HEALTH: {
        EXCELLENT: 90,
        GOOD: 70,
        FAIR: 50,
        POOR: 30
    }
};

// ============================================================================
// STATE
// ============================================================================

/**
 * Performance metrics storage
 * @type {Object}
 */
const metrics = {
    // Connection stats
    connections: {
        total: 0,
        active: 0,
        failed: 0,
        reconnects: 0
    },

    // Latency tracking (ms)
    latency: {
        current: 0,
        average: 0,
        min: Infinity,
        max: 0,
        history: []
    },

    // Event tracking
    events: {
        sent: 0,
        received: 0,
        errors: 0,
        history: []
    },

    // Role presence tracking
    roles: {
        // Will be populated with ROLES data
    },

    // Session info
    session: {
        startTime: Date.now(),
        uptime: 0,
        lastUpdate: Date.now()
    }
};

/**
 * Dashboard DOM element
 * @type {HTMLElement|null}
 */
let dashboardElement = null;

/**
 * Update interval ID
 * @type {number|null}
 */
let updateIntervalId = null;

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Initialize performance monitor
 * @param {Object} options - Configuration options
 */
export function init(options = {}) {
    if (!FEATURES.ENABLE_PERFORMANCE_MONITOR) {
        console.log('📊 Performance monitor is disabled via feature flag');
        return;
    }

    try {
        console.log('📊 Initializing Performance Monitor...');

        // Initialize role tracking
        initializeRoleTracking();

        // Start monitoring intervals
        startMonitoring();

        console.log('✅ Performance Monitor initialized');
    } catch (error) {
        console.error('❌ Failed to initialize performance monitor:', error);
    }
}

/**
 * Create and inject dashboard into page
 * @param {string} containerId - ID of container element (optional)
 * @returns {HTMLElement} Dashboard element
 */
export function createDashboard(containerId = null) {
    try {
        dashboardElement = document.createElement('div');
        dashboardElement.id = 'performance-dashboard';
        dashboardElement.className = 'fixed bottom-4 right-4 bg-white shadow-2xl rounded-lg border border-gray-200 p-4 max-w-md z-40';
        dashboardElement.innerHTML = getDashboardHTML();

        // Append to container or body
        const container = containerId ?
            document.getElementById(containerId) :
            document.body;

        container.appendChild(dashboardElement);

        // Start live updates
        startDashboardUpdates();

        // Add toggle functionality
        setupDashboardToggle();

        return dashboardElement;
    } catch (error) {
        console.error('❌ Error creating dashboard:', error);
        return null;
    }
}

/**
 * Record a connection event
 * @param {string} type - Event type (connect, disconnect, reconnect, error)
 * @param {Object} data - Event data
 */
export function recordConnection(type, data = {}) {
    try {
        switch (type) {
            case 'connect':
                metrics.connections.total++;
                metrics.connections.active++;
                break;
            case 'disconnect':
                metrics.connections.active = Math.max(0, metrics.connections.active - 1);
                break;
            case 'reconnect':
                metrics.connections.reconnects++;
                break;
            case 'error':
                metrics.connections.failed++;
                break;
        }

        recordEvent(type, data);
    } catch (error) {
        console.error('❌ Error recording connection:', error);
    }
}

/**
 * Record latency measurement
 * @param {number} latencyMs - Latency in milliseconds
 */
export function recordLatency(latencyMs) {
    try {
        if (typeof latencyMs !== 'number' || latencyMs < 0) return;

        metrics.latency.current = latencyMs;
        metrics.latency.history.push({
            timestamp: Date.now(),
            value: latencyMs
        });

        // Update stats
        metrics.latency.min = Math.min(metrics.latency.min, latencyMs);
        metrics.latency.max = Math.max(metrics.latency.max, latencyMs);

        // Calculate average
        const recent = metrics.latency.history.slice(-20); // Last 20 measurements
        const sum = recent.reduce((acc, item) => acc + item.value, 0);
        metrics.latency.average = Math.round(sum / recent.length);

        // Cleanup old history
        if (metrics.latency.history.length > CONFIG.HISTORY_LIMIT) {
            metrics.latency.history = metrics.latency.history.slice(-CONFIG.HISTORY_LIMIT);
        }
    } catch (error) {
        console.error('❌ Error recording latency:', error);
    }
}

/**
 * Record role presence
 * @param {number} roleId - Role ID
 * @param {boolean} isPresent - Whether role is connected
 */
export function recordRolePresence(roleId, isPresent) {
    try {
        if (metrics.roles[roleId]) {
            metrics.roles[roleId].present = isPresent;
            metrics.roles[roleId].lastSeen = Date.now();
        }
    } catch (error) {
        console.error('❌ Error recording role presence:', error);
    }
}

/**
 * Get current health score (0-100)
 * @returns {number} Health score
 */
export function getHealthScore() {
    let score = 100;

    // Deduct for high latency
    if (metrics.latency.current > WEBSOCKET.LATENCY_CRITICAL_THRESHOLD) {
        score -= 30;
    } else if (metrics.latency.current > WEBSOCKET.LATENCY_WARNING_THRESHOLD) {
        score -= 15;
    }

    // Deduct for failures
    if (metrics.connections.failed > 0) {
        score -= Math.min(20, metrics.connections.failed * 5);
    }

    // Deduct for reconnections
    if (metrics.connections.reconnects > 0) {
        score -= Math.min(10, metrics.connections.reconnects * 2);
    }

    // Deduct for missing roles
    const missingRoles = Object.values(metrics.roles).filter(r => !r.present).length;
    if (missingRoles > 0) {
        score -= Math.min(20, missingRoles * 5);
    }

    return Math.max(0, Math.min(100, score));
}

/**
 * Get metrics summary
 * @returns {Object} Metrics object
 */
export function getMetrics() {
    return {
        ...metrics,
        health: getHealthScore()
    };
}

/**
 * Reset all metrics
 */
export function reset() {
    metrics.connections = { total: 0, active: 0, failed: 0, reconnects: 0 };
    metrics.latency = { current: 0, average: 0, min: Infinity, max: 0, history: [] };
    metrics.events = { sent: 0, received: 0, errors: 0, history: [] };
    metrics.session.startTime = Date.now();
}

// ============================================================================
// PRIVATE FUNCTIONS
// ============================================================================

/**
 * Initialize role tracking
 * @private
 */
function initializeRoleTracking() {
    ROLES.TRACKED.forEach(roleId => {
        metrics.roles[roleId] = {
            id: roleId,
            name: ROLES.NAMES[roleId],
            present: false,
            lastSeen: null
        };
    });
}

/**
 * Start monitoring intervals
 * @private
 */
function startMonitoring() {
    // Update uptime
    updateIntervalId = setInterval(() => {
        metrics.session.uptime = Date.now() - metrics.session.startTime;
        metrics.session.lastUpdate = Date.now();

        // Cleanup old data
        cleanupOldData();
    }, CONFIG.UPDATE_INTERVAL);
}

/**
 * Record an event
 * @param {string} type - Event type
 * @param {Object} data - Event data
 * @private
 */
function recordEvent(type, data) {
    metrics.events.history.push({
        timestamp: Date.now(),
        type,
        data
    });

    // Cleanup old events
    if (metrics.events.history.length > CONFIG.EVENT_LOG_LIMIT) {
        metrics.events.history = metrics.events.history.slice(-CONFIG.EVENT_LOG_LIMIT);
    }
}

/**
 * Cleanup old data
 * @private
 */
function cleanupOldData() {
    const cutoff = Date.now() - CONFIG.CLEANUP_INTERVAL;

    // Cleanup latency history
    metrics.latency.history = metrics.latency.history.filter(
        item => item.timestamp > cutoff
    );

    // Cleanup event history
    metrics.events.history = metrics.events.history.filter(
        item => item.timestamp > cutoff
    );
}

/**
 * Start dashboard live updates
 * @private
 */
function startDashboardUpdates() {
    if (!dashboardElement) return;

    setInterval(() => {
        updateDashboardContent();
    }, 1000); // Update every second
}

/**
 * Update dashboard content
 * @private
 */
function updateDashboardContent() {
    if (!dashboardElement) return;

    try {
        const health = getHealthScore();
        const healthClass = getHealthClass(health);
        const uptimeFormatted = formatUptime(metrics.session.uptime);

        // Update health
        const healthEl = dashboardElement.querySelector('#perf-health');
        if (healthEl) {
            healthEl.textContent = `${health}%`;
            healthEl.className = `text-2xl font-bold ${healthClass}`;
        }

        // Update latency
        const latencyEl = dashboardElement.querySelector('#perf-latency');
        if (latencyEl) {
            latencyEl.textContent = `${metrics.latency.current}ms`;
        }

        // Update connections
        const connectionsEl = dashboardElement.querySelector('#perf-connections');
        if (connectionsEl) {
            connectionsEl.textContent = metrics.connections.active;
        }

        // Update uptime
        const uptimeEl = dashboardElement.querySelector('#perf-uptime');
        if (uptimeEl) {
            uptimeEl.textContent = uptimeFormatted;
        }

        // Update role status
        updateRoleStatus();
    } catch (error) {
        console.error('❌ Error updating dashboard:', error);
    }
}

/**
 * Update role presence status
 * @private
 */
function updateRoleStatus() {
    Object.values(metrics.roles).forEach(role => {
        const el = dashboardElement.querySelector(`#role-${role.id}`);
        if (el) {
            const statusClass = role.present ? 'bg-green-500' : 'bg-gray-400';
            const statusDot = el.querySelector('.status-dot');
            if (statusDot) {
                statusDot.className = `status-dot w-2 h-2 rounded-full ${statusClass}`;
            }
        }
    });
}

/**
 * Get health CSS class
 * @param {number} health - Health score
 * @returns {string} CSS class
 * @private
 */
function getHealthClass(health) {
    if (health >= CONFIG.HEALTH.EXCELLENT) return 'text-green-600';
    if (health >= CONFIG.HEALTH.GOOD) return 'text-blue-600';
    if (health >= CONFIG.HEALTH.FAIR) return 'text-yellow-600';
    if (health >= CONFIG.HEALTH.POOR) return 'text-orange-600';
    return 'text-red-600';
}

/**
 * Format uptime
 * @param {number} ms - Uptime in milliseconds
 * @returns {string} Formatted uptime
 * @private
 */
function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

/**
 * Get dashboard HTML
 * @returns {string} HTML string
 * @private
 */
function getDashboardHTML() {
    return `
        <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-bold text-gray-800">System Monitor</h3>
            <button id="dashboard-toggle" class="text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>

        <div id="dashboard-content">
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="bg-gray-50 rounded p-2">
                    <div class="text-xs text-gray-600">Health</div>
                    <div id="perf-health" class="text-2xl font-bold text-green-600">100%</div>
                </div>
                <div class="bg-gray-50 rounded p-2">
                    <div class="text-xs text-gray-600">Latency</div>
                    <div id="perf-latency" class="text-2xl font-bold text-gray-800">0ms</div>
                </div>
                <div class="bg-gray-50 rounded p-2">
                    <div class="text-xs text-gray-600">Connections</div>
                    <div id="perf-connections" class="text-2xl font-bold text-gray-800">0</div>
                </div>
                <div class="bg-gray-50 rounded p-2">
                    <div class="text-xs text-gray-600">Uptime</div>
                    <div id="perf-uptime" class="text-2xl font-bold text-gray-800">0s</div>
                </div>
            </div>

            <div class="border-t pt-3">
                <div class="text-xs font-semibold text-gray-700 mb-2">User Presence</div>
                <div class="space-y-1">
                    ${Object.values(metrics.roles).map(role => `
                        <div id="role-${role.id}" class="flex items-center justify-between text-sm">
                            <span class="text-gray-700">${role.name}</span>
                            <span class="status-dot w-2 h-2 rounded-full bg-gray-400"></span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup dashboard toggle functionality
 * @private
 */
function setupDashboardToggle() {
    const toggleBtn = dashboardElement.querySelector('#dashboard-toggle');
    const content = dashboardElement.querySelector('#dashboard-content');

    if (toggleBtn && content) {
        let isCollapsed = false;

        toggleBtn.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            content.style.display = isCollapsed ? 'none' : 'block';
        });
    }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
    init,
    createDashboard,
    recordConnection,
    recordLatency,
    recordRolePresence,
    getHealthScore,
    getMetrics,
    reset
};
