window._ = require("lodash");

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

// WebSocket connection state management
window.wsConnectionState = {
    isConnected: false,
    reconnectAttempts: 0,
    maxReconnectAttempts: 10,
    reconnectDelay: 1000, // Start with 1 second
    heartbeatInterval: null,
    latency: 0,
    maxLatencyAttempts: 5,
    latencyMeasurements: [],

    // ========================================
    // ADAPTIVE HEARTBEAT: Idle detection
    // ========================================
    isIdle: false,
    idleTimeout: 60000, // 60 seconds of inactivity = idle
    idleCheckInterval: null,
    lastActivityTime: Date.now(),
    normalHeartbeatInterval: 15000, // 15 seconds when active
    idleHeartbeatInterval: 60000, // 60 seconds when idle (reduce spam)
};

// Configure Pusher with optimized settings for LAN
window.Pusher.logToConsole = process.env.NODE_ENV === 'development';

window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    encrypted: false,
    enabledTransports: ["ws", "wss"],
    disableStats: true,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,

    // Optimized connection settings for LAN
    authEndpoint: '/broadcasting/auth',
    auth: {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
        }
    },

    // Activity timeout (ping/pong)
    activityTimeout: 30000, // 30 seconds
    pongTimeout: 10000, // 10 seconds

    // Connection settings
    enabledTransports: ['ws', 'wss'],
    disabledTransports: ['sockjs', 'xhr_polling', 'xhr_streaming'],

    // Reconnection with exponential backoff
    enabledTransports: ['ws'],
    unavailableTimeout: 5000,
});

// Connection event handlers
if (window.Echo.connector && window.Echo.connector.pusher) {
    const pusher = window.Echo.connector.pusher;

    // Connected
    pusher.connection.bind('connected', function() {
        if (process.env.NODE_ENV === 'development') console.log('✅ WebSocket connected');
        window.wsConnectionState.isConnected = true;
        window.wsConnectionState.reconnectAttempts = 0;
        window.wsConnectionState.reconnectDelay = 1000;
        updateConnectionUI(true);
        startHeartbeat();
    });

    // Disconnected
    pusher.connection.bind('disconnected', function() {
        if (process.env.NODE_ENV === 'development') console.log('⚠️ WebSocket disconnected');
        window.wsConnectionState.isConnected = false;
        updateConnectionUI(false);
        stopHeartbeat();
        stopIdleDetection();
    });

    // Connection failed
    pusher.connection.bind('failed', function() {
        console.error('❌ WebSocket connection failed');
        window.wsConnectionState.isConnected = false;
        updateConnectionUI(false);
        handleReconnection();
    });

    // Connection unavailable
    pusher.connection.bind('unavailable', function() {
        if (process.env.NODE_ENV === 'development') console.warn('⏳ WebSocket unavailable, attempting reconnection...');
        handleReconnection();
    });

    // Error handling
    pusher.connection.bind('error', function(err) {
        console.error('WebSocket error:', err);
        updateConnectionUI(false);
    });
}

// Heartbeat mechanism to keep connection alive and measure latency (ADAPTIVE)
function startHeartbeat() {
    stopHeartbeat(); // Clear any existing interval
    startIdleDetection();

    // Adaptive heartbeat based on idle state
    const heartbeatFunction = () => {
        if (window.Echo.connector && window.Echo.connector.pusher) {
            const state = window.Echo.connector.pusher.connection.state;
            if (state !== 'connected') {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Heartbeat detected disconnection, state:', state);
                }
                handleReconnection();
            } else {
                // Only measure latency when active (reduce spam during idle)
                if (!window.wsConnectionState.isIdle) {
                    measureLatency();
                } else if (process.env.NODE_ENV === 'development') {
                    console.log('⏸️ Heartbeat skipped - idle mode');
                }
            }
        }
    };

    // Schedule with adaptive interval
    const interval = window.wsConnectionState.isIdle ?
        window.wsConnectionState.idleHeartbeatInterval :
        window.wsConnectionState.normalHeartbeatInterval;

    window.wsConnectionState.heartbeatInterval = setInterval(heartbeatFunction, interval);
}

// Measure connection latency by pinging server with enhanced diagnostics
function measureLatency() {
    if (!window.Echo.connector || !window.Echo.connector.pusher) return;

    const pusher = window.Echo.connector.pusher;
    const connectionState = pusher.connection.state;

    if (connectionState === 'connected') {
        const startTime = performance.now();

        // Send lightweight OPTIONS request for better performance
        window.axios.options('/api/ping')
            .then(() => {
                const latency = Math.round(performance.now() - startTime);
                window.wsConnectionState.latency = latency;
                window.wsConnectionState.latencyMeasurements.push(latency);

                // Calculate average latency
                const avgLatency = Math.round(
                    window.wsConnectionState.latencyMeasurements.reduce((a, b) => a + b, 0) /
                    window.wsConnectionState.latencyMeasurements.length
                );

                // ANOMALY DETECTION: Alert if latency spikes > 2x average or exceeds 500ms
                if (window.wsConnectionState.latencyMeasurements.length >= 2) {
                    if (latency > avgLatency * 2 || latency > 500) {
                        console.warn(`⚠️ LATENCY SPIKE: ${latency}ms (avg: ${avgLatency}ms)`);
                        window.wsConnectionState.lastSpikeTime = Date.now();

                        // Log spike details for debugging
                        if (window.debugMode) {
                            console.table({
                                'Current': latency + 'ms',
                                'Average': avgLatency + 'ms',
                                'Deviation': ((latency / avgLatency - 1) * 100).toFixed(1) + '%',
                                'Samples': window.wsConnectionState.latencyMeasurements.length
                            });
                        }
                    }
                }

                // Keep only last 20 measurements for better averaging
                if (window.wsConnectionState.latencyMeasurements.length > 20) {
                    window.wsConnectionState.latencyMeasurements.shift();
                }

                updateConnectionUI(true);
            })
            .catch((err) => {
                console.error('Ping request failed:', err.message);
                window.wsConnectionState.latency = 0;
                updateConnectionUI(false);
            });
    }
}

function stopHeartbeat() {
    if (window.wsConnectionState.heartbeatInterval) {
        clearInterval(window.wsConnectionState.heartbeatInterval);
        window.wsConnectionState.heartbeatInterval = null;
    }
}

// ========================================
// ADAPTIVE HEARTBEAT: Idle detection system
// ========================================
function startIdleDetection() {
    // Register activity listeners to track user interaction
    const activityEvents = ['click', 'keydown', 'mousemove', 'touchstart', 'scroll'];

    const handleActivity = () => {
        const wasIdle = window.wsConnectionState.isIdle;
        window.wsConnectionState.lastActivityTime = Date.now();
        window.wsConnectionState.isIdle = false;

        // Log state change only in development
        if (wasIdle && process.env.NODE_ENV === 'development') {
            console.log('▶️ Activity detected - resuming normal heartbeat');
        }
    };

    // Add listeners for all activity events
    activityEvents.forEach(event => {
        document.addEventListener(event, handleActivity, { passive: true });
    });

    // Check for idle state periodically
    window.wsConnectionState.idleCheckInterval = setInterval(() => {
        const timeSinceLastActivity = Date.now() - window.wsConnectionState.lastActivityTime;
        const newIdleState = timeSinceLastActivity > window.wsConnectionState.idleTimeout;

        // Log state transitions
        if (newIdleState && !window.wsConnectionState.isIdle && process.env.NODE_ENV === 'development') {
            console.log('⏸️ Idle detected - reducing heartbeat frequency');
        }

        window.wsConnectionState.isIdle = newIdleState;
    }, 10000); // Check every 10 seconds
}

function stopIdleDetection() {
    if (window.wsConnectionState.idleCheckInterval) {
        clearInterval(window.wsConnectionState.idleCheckInterval);
        window.wsConnectionState.idleCheckInterval = null;
    }
}

// Exponential backoff reconnection
function handleReconnection() {
    if (window.wsConnectionState.reconnectAttempts >= window.wsConnectionState.maxReconnectAttempts) {
        console.error('❌ Max reconnection attempts reached. Please refresh the page.');
        showReconnectionError();
        return;
    }

    window.wsConnectionState.reconnectAttempts++;
    const delay = Math.min(
        window.wsConnectionState.reconnectDelay * Math.pow(2, window.wsConnectionState.reconnectAttempts - 1),
        30000 // Max 30 seconds
    );

    if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 Reconnecting in ${delay / 1000}s (attempt ${window.wsConnectionState.reconnectAttempts})...`);
    }

    setTimeout(() => {
        if (window.Echo.connector && window.Echo.connector.pusher) {
            window.Echo.connector.pusher.connect();
        }
    }, delay);
}

// Update UI to show connection status
function updateConnectionUI(isConnected) {
    const container = document.getElementById('ws-indicator-container');
    if (!container) return;

    const indicator = container.querySelector('.ws-indicator-dot');
    const statusText = container.querySelector('.ws-status-text');
    const latencyContainer = container.querySelector('.ws-latency-container');
    const latencyText = container.querySelector('.ws-latency-text');
    const reconnectBtn = container.querySelector('.ws-reconnect-btn');

    if (indicator) {
        // Remove all status classes
        indicator.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-gray-400', 'bg-green-500');

        if (isConnected) {
            indicator.classList.add('bg-green-500');
            if (statusText) statusText.textContent = 'Terhubung';
            if (reconnectBtn) reconnectBtn.classList.add('hidden');
        } else if (window.wsConnectionState.reconnectAttempts > 0 && window.wsConnectionState.reconnectAttempts < window.wsConnectionState.maxReconnectAttempts) {
            indicator.classList.add('bg-yellow-500');
            if (statusText) statusText.textContent = `Reconnecting... (${window.wsConnectionState.reconnectAttempts}/${window.wsConnectionState.maxReconnectAttempts})`;
            if (reconnectBtn) reconnectBtn.classList.add('hidden');
        } else {
            indicator.classList.add('bg-red-500');
            if (statusText) statusText.textContent = 'Terputus';
            if (reconnectBtn && window.wsConnectionState.reconnectAttempts >= window.wsConnectionState.maxReconnectAttempts) {
                reconnectBtn.classList.remove('hidden');
            }
        }
    }

    // Update latency display - show quality section when latency available
    if (latencyContainer) {
        if (window.wsConnectionState.latency > 0 && isConnected) {
            latencyContainer.classList.remove('hidden');
        } else {
            latencyContainer.classList.add('hidden');
        }
    }

    // Show/hide reconnect button separator
    const separators = document.querySelectorAll('.h-6.w-px.bg-gray-600');
    if (separators.length > 0) {
        const lastSeparator = separators[separators.length - 1];
        if (reconnectBtn && window.wsConnectionState.reconnectAttempts >= window.wsConnectionState.maxReconnectAttempts) {
            lastSeparator.classList.remove('hidden');
        } else {
            lastSeparator.classList.add('hidden');
        }
    }

    // Dispatch custom event for components to listen to
    // This event triggers the improved component's update functions
    window.dispatchEvent(new CustomEvent('websocket-status', {
        detail: {
            isConnected,
            latency: window.wsConnectionState.latency,
            reconnectAttempts: window.wsConnectionState.reconnectAttempts,
            status: isConnected ? 'connected' : reconnectAttempts > 0 ? 'reconnecting' : 'disconnected'
        }
    }));
}

// Show error message for max reconnection attempts
function showReconnectionError() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <div>
                <p class="font-bold">Koneksi Terputus</p>
                <p class="text-sm">Silakan refresh halaman untuk terhubung kembali</p>
            </div>
        </div>
    `;
    document.body.appendChild(errorDiv);
}

// Manual reconnect function for user-triggered recovery
window.manualReconnect = function() {
    if (process.env.NODE_ENV === 'development') console.log('🔄 Manual reconnection triggered');
    window.wsConnectionState.reconnectAttempts = 0;
    window.wsConnectionState.reconnectDelay = 1000;

    if (window.Echo.connector && window.Echo.connector.pusher) {
        window.Echo.connector.pusher.connect();
        updateConnectionUI(false);
    }
};

// Initialize on page load
window.addEventListener('load', function() {
    if (process.env.NODE_ENV === 'development') {
        console.log('🚀 WebSocket initialization complete');
        console.log('📡 Connecting to:', window.location.hostname + ':6001');
    }
});
