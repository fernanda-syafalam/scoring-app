/**
 * WebSocket Monitoring and Debugging Helper
 * Tracks connection health, performance, and errors
 */

class WebSocketMonitor {
    constructor() {
        this.metrics = {
            connectionAttempts: 0,
            successfulConnections: 0,
            failedConnections: 0,
            disconnections: 0,
            reconnections: 0,
            eventsReceived: 0,
            eventsSent: 0,
            errors: [],
            lastConnected: null,
            lastDisconnected: null,
            averageLatency: 0,
            latencySamples: [],
        };

        this.isMonitoring = false;
        this.logLevel = 'info'; // 'debug', 'info', 'warn', 'error'
    }

    start() {
        this.isMonitoring = true;
        this.log('info', '📊 WebSocket monitoring started');
        this.attachListeners();
    }

    stop() {
        this.isMonitoring = false;
        this.log('info', '📊 WebSocket monitoring stopped');
    }

    attachListeners() {
        if (!window.Echo || !window.Echo.connector) {
            this.log('warn', 'Echo not initialized yet');
            return;
        }

        const pusher = window.Echo.connector.pusher;

        // Track connection attempts
        pusher.connection.bind('connecting', () => {
            this.metrics.connectionAttempts++;
            this.log('debug', `Connection attempt #${this.metrics.connectionAttempts}`);
        });

        // Track successful connections
        pusher.connection.bind('connected', () => {
            this.metrics.successfulConnections++;
            this.metrics.lastConnected = new Date();
            this.log('info', `✅ Connected (total: ${this.metrics.successfulConnections})`);
        });

        // Track disconnections
        pusher.connection.bind('disconnected', () => {
            this.metrics.disconnections++;
            this.metrics.lastDisconnected = new Date();
            this.log('warn', `⚠️ Disconnected (total: ${this.metrics.disconnections})`);
        });

        // Track failed connections
        pusher.connection.bind('failed', () => {
            this.metrics.failedConnections++;
            this.log('error', `❌ Connection failed (total: ${this.metrics.failedConnections})`);
        });

        // Track errors
        pusher.connection.bind('error', (err) => {
            this.metrics.errors.push({
                timestamp: new Date(),
                error: err,
            });
            this.log('error', '❌ WebSocket error:', err);
        });
    }

    // Track event received
    eventReceived(channelName, eventName) {
        this.metrics.eventsReceived++;
        this.log('debug', `📥 Event received: ${channelName}/${eventName} (total: ${this.metrics.eventsReceived})`);
    }

    // Track event sent
    eventSent(channelName, eventName) {
        this.metrics.eventsSent++;
        this.log('debug', `📤 Event sent: ${channelName}/${eventName} (total: ${this.metrics.eventsSent})`);
    }

    // Measure latency (ping)
    measureLatency() {
        if (!window.Echo || !window.Echo.connector) return;

        const start = performance.now();
        const pusher = window.Echo.connector.pusher;

        // Send ping, measure pong response time
        pusher.send_event('pusher:ping', {});

        pusher.connection.bind('pusher:pong', () => {
            const latency = performance.now() - start;
            this.metrics.latencySamples.push(latency);

            // Keep only last 10 samples
            if (this.metrics.latencySamples.length > 10) {
                this.metrics.latencySamples.shift();
            }

            // Calculate average
            this.metrics.averageLatency =
                this.metrics.latencySamples.reduce((a, b) => a + b, 0) /
                this.metrics.latencySamples.length;

            this.log('debug', `🏓 Latency: ${latency.toFixed(2)}ms (avg: ${this.metrics.averageLatency.toFixed(2)}ms)`);
        });
    }

    // Get current connection state
    getConnectionState() {
        if (!window.Echo || !window.Echo.connector) return 'not_initialized';
        return window.Echo.connector.pusher.connection.state;
    }

    // Get uptime since last connection
    getUptime() {
        if (!this.metrics.lastConnected) return 0;
        return Date.now() - this.metrics.lastConnected.getTime();
    }

    // Get full report
    getReport() {
        return {
            state: this.getConnectionState(),
            uptime: this.getUptime(),
            metrics: this.metrics,
            health: this.getHealthScore(),
        };
    }

    // Calculate health score (0-100)
    getHealthScore() {
        let score = 100;

        // Penalize for failed connections
        if (this.metrics.connectionAttempts > 0) {
            const failureRate = this.metrics.failedConnections / this.metrics.connectionAttempts;
            score -= failureRate * 30;
        }

        // Penalize for frequent disconnections
        if (this.metrics.disconnections > 5) {
            score -= 20;
        }

        // Penalize for recent errors
        const recentErrors = this.metrics.errors.filter(e =>
            Date.now() - e.timestamp.getTime() < 60000 // Last minute
        ).length;
        score -= recentErrors * 10;

        // Penalize for high latency
        if (this.metrics.averageLatency > 500) {
            score -= 20;
        } else if (this.metrics.averageLatency > 200) {
            score -= 10;
        }

        return Math.max(0, Math.min(100, score));
    }

    // Print report to console
    printReport() {
        console.group('📊 WebSocket Health Report');
        console.log('State:', this.getConnectionState());
        console.log('Uptime:', (this.getUptime() / 1000).toFixed(0), 'seconds');
        console.log('Health Score:', this.getHealthScore() + '%');
        console.log('Connections:', this.metrics.successfulConnections);
        console.log('Disconnections:', this.metrics.disconnections);
        console.log('Failed Attempts:', this.metrics.failedConnections);
        console.log('Events Received:', this.metrics.eventsReceived);
        console.log('Events Sent:', this.metrics.eventsSent);
        console.log('Average Latency:', this.metrics.averageLatency.toFixed(2), 'ms');
        console.log('Recent Errors:', this.metrics.errors.length);
        console.groupEnd();
    }

    // Log with level
    log(level, ...args) {
        if (!this.isMonitoring) return;

        const levels = ['debug', 'info', 'warn', 'error'];
        const currentLevel = levels.indexOf(this.logLevel);
        const messageLevel = levels.indexOf(level);

        if (messageLevel >= currentLevel) {
            const timestamp = new Date().toLocaleTimeString();
            console[level](`[${timestamp}] [WebSocket]`, ...args);
        }
    }
}

// Initialize global monitor
window.wsMonitor = new WebSocketMonitor();

// Auto-start in development
if (process.env.NODE_ENV === 'development') {
    window.wsMonitor.start();

    // Measure latency every 30 seconds
    setInterval(() => {
        if (window.wsMonitor.getConnectionState() === 'connected') {
            window.wsMonitor.measureLatency();
        }
    }, 30000);

    // Print report every 60 seconds in development
    setInterval(() => {
        window.wsMonitor.printReport();
    }, 60000);
}

// Expose helper function for manual monitoring
window.wsHealth = () => window.wsMonitor.printReport();

export default WebSocketMonitor;
