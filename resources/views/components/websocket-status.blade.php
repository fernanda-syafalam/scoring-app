{{-- WebSocket Connection Status Indicator - Enhanced Version with Phase 1 Improvements --}}
<div id="ws-indicator-container"
     class="fixed bottom-40 left-1/2 transform -translate-x-1/2 z-50
            md:w-auto w-[calc(100%-2rem)] md:mx-0 mx-4"
     role="status"
     aria-live="polite"
     aria-label="WebSocket connection status indicator">

    <div class="flex items-center justify-center gap-4 px-4 py-3 rounded-lg
                bg-gray-900 hover:bg-gray-800 text-white
                shadow-lg border border-gray-700
                transition-all duration-300 min-w-max">

        {{-- Status Icon with animated indicator dot --}}
        <div class="flex items-center gap-2">
            {{-- Animated status indicator dot --}}
            <div class="ws-indicator-dot relative flex h-3 w-3">
                {{-- Outer pulsing ring for emphasis --}}
                <span class="absolute inset-0 rounded-full
                            animate-pulse opacity-60"
                     style="background: inherit;"></span>

                {{-- Inner solid dot --}}
                <span class="relative block h-full w-full rounded-full
                            bg-gray-400"></span>
            </div>

            {{-- Status text with better hierarchy --}}
            <div class="flex flex-col gap-0.5">
                <span class="ws-status-text text-xs font-semibold
                            uppercase tracking-wide">
                    Menghubungkan...
                </span>
                <span class="ws-status-detail text-xs text-gray-400
                            hidden sm:inline">
                    {{-- Secondary info: latency or reconnect attempt --}}
                </span>
            </div>
        </div>

        {{-- Separator --}}
        <div class="h-6 w-px bg-gray-600 opacity-50"></div>

        {{-- Latency Display with Quality Indicator --}}
        <div class="hidden ws-quality-section flex items-center gap-2">
            {{-- Latency value and unit --}}
            <div class="text-right">
                <div class="text-xs text-gray-400">Latency</div>
                <span class="ws-latency-value font-mono text-sm font-bold
                           text-white">--ms</span>
            </div>

            {{-- Quality badge with color coding --}}
            <span class="ws-quality-badge text-xs px-2 py-1 rounded-full
                        font-medium bg-gray-700 text-gray-300">
                --
            </span>
        </div>

        {{-- Separator before action button --}}
        <div class="h-6 w-px bg-gray-600 opacity-50 hidden ws-reconnect-btn"></div>

        {{-- Reconnect Button - Modern style with proper event handling --}}
        <button type="button"
                id="ws-reconnect-button"
                class="ws-reconnect-btn hidden px-3 py-1.5
                       bg-red-600 hover:bg-red-700 active:bg-red-800
                       text-white text-xs font-medium
                       rounded-md transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                       focus:ring-offset-gray-900"
                title="Click to manually reconnect to the server"
                aria-label="Reconnect to WebSocket server">
            <svg class="w-3.5 h-3.5 inline mr-1.5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                     d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Sambungkan Ulang</span>
        </button>

        {{-- Screen reader only text for detailed status --}}
        <span class="ws-sr-only sr-only" id="ws-sr-text"
             aria-live="assertive" aria-atomic="true">
            Terhubung ke server
        </span>
    </div>
</div>

<style>
    {{-- Screen reader only utility class --}}
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    {{-- Smooth color transitions for status changes --}}
    .ws-indicator-dot {
        transition: background-color 0.3s ease-in-out;
    }

    {{-- Focus styles for accessibility --}}
    button:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
</style>

<script>
    {{-- Latency quality thresholds and configuration --}}
    const LATENCY_QUALITY = {
        excellent: { max: 50, label: 'Sempurna', color: 'bg-green-600', textColor: 'text-white' },
        good: { max: 100, label: 'Bagus', color: 'bg-blue-600', textColor: 'text-white' },
        fair: { max: 200, label: 'Sedang', color: 'bg-yellow-600', textColor: 'text-white' },
        poor: { max: Infinity, label: 'Buruk', color: 'bg-red-600', textColor: 'text-white' }
    };

    /**
     * Get latency quality level and styling
     * @param {number} latencyMs - Latency in milliseconds
     * @returns {object} Quality level info with colors
     */
    function getLatencyQuality(latencyMs) {
        for (const [level, config] of Object.entries(LATENCY_QUALITY)) {
            if (latencyMs <= config.max) {
                return { level, ...config };
            }
        }
        return LATENCY_QUALITY.poor;
    }

    /**
     * Update status icon color and animation
     * @param {string} status - Connection status (connecting, connected, reconnecting, disconnected)
     */
    function updateStatusIcon(status) {
        const dotElement = document.querySelector('.ws-indicator-dot');
        if (!dotElement) return;

        const colors = {
            'connecting': 'bg-gray-400',
            'connected': 'bg-green-500',
            'reconnecting': 'bg-yellow-500',
            'disconnected': 'bg-red-500'
        };

        const bgColor = colors[status] || colors.connecting;

        // Update outer pulsing ring
        const outerSpan = dotElement.querySelector('span:first-child');
        if (outerSpan) {
            outerSpan.style.background = 'inherit';
        }

        // Update inner solid dot - remove old color classes and add new one
        const innerSpan = dotElement.querySelector('span:last-child');
        if (innerSpan) {
            Array.from(innerSpan.classList).forEach(cls => {
                if (cls.startsWith('bg-')) innerSpan.classList.remove(cls);
            });
            innerSpan.classList.add(bgColor);
        }

        // Update parent container color
        dotElement.classList.forEach(cls => {
            if (cls.startsWith('bg-')) dotElement.classList.remove(cls);
        });
        dotElement.classList.add(bgColor);
    }

    /**
     * Update latency quality display badge
     * @param {number} latencyMs - Latency in milliseconds
     */
    function updateLatencyDisplay(latencyMs) {
        const quality = getLatencyQuality(latencyMs);
        const badgeElement = document.querySelector('.ws-quality-badge');
        const valueElement = document.querySelector('.ws-latency-value');

        if (badgeElement) {
            badgeElement.textContent = quality.label;
            badgeElement.className = `ws-quality-badge text-xs px-2 py-1 rounded-full
                                     font-medium ${quality.textColor} ${quality.color}`;
        }

        if (valueElement) {
            valueElement.textContent = `${latencyMs}ms`;
        }
    }

    /**
     * Update screen reader text for accessibility
     * @param {string} status - Connection status
     * @param {number} latencyMs - Latency in milliseconds
     * @param {number} attempt - Reconnection attempt number
     */
    function updateScreenReaderText(status, latencyMs = 0, attempt = 0) {
        const srElement = document.getElementById('ws-sr-text');
        if (!srElement) return;

        let text = '';
        switch (status) {
            case 'connected':
                text = latencyMs > 0
                    ? `Terhubung ke server dengan latency ${latencyMs}ms`
                    : 'Terhubung ke server';
                break;
            case 'reconnecting':
                text = `Menghubung ulang ke server, percobaan ${attempt}`;
                break;
            case 'disconnected':
                text = 'Terputus dari server. Klik tombol Sambungkan Ulang untuk mencoba lagi';
                break;
            case 'connecting':
                text = 'Menghubungkan ke server...';
                break;
        }
        srElement.textContent = text;
    }

    /**
     * Update status detail text
     * @param {string} detail - Detail text to display
     */
    function updateStatusDetail(detail) {
        const detailElement = document.querySelector('.ws-status-detail');
        if (detailElement) {
            detailElement.textContent = detail;
        }
    }

    // Listen to websocket status changes from bootstrap.js
    window.addEventListener('websocket-status', function(event) {
        const { isConnected, latency, reconnectAttempts } = event.detail;

        // Determine current status
        const status = isConnected
            ? 'connected'
            : reconnectAttempts > 0
                ? 'reconnecting'
                : 'disconnected';

        // Update visual indicators
        updateStatusIcon(status);
        updateScreenReaderText(status, latency, reconnectAttempts);

        // Update detail text
        if (isConnected) {
            updateStatusDetail(latency > 0 ? `Server latency: ${latency}ms` : 'Server terhubung');
        } else if (reconnectAttempts > 0) {
            updateStatusDetail(`Percobaan ${reconnectAttempts}`);
        } else {
            updateStatusDetail('Koneksi terputus');
        }

        // Update latency display if available
        if (latency > 0 && isConnected) {
            updateLatencyDisplay(latency);
        }
    });

    // Reconnect button event listener (replacing inline onclick for better practices)
    document.getElementById('ws-reconnect-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        this.disabled = true;
        this.setAttribute('aria-busy', 'true');

        // Call manual reconnect
        if (window.manualReconnect) {
            window.manualReconnect();
        }

        // Re-enable button after 2 seconds
        setTimeout(() => {
            this.disabled = false;
            this.setAttribute('aria-busy', 'false');
        }, 2000);
    });

    // Initial status check when page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (window.Echo?.connector?.pusher?.connection?.state === 'connected') {
                window.wsConnectionState.isConnected = true;
                window.updateConnectionUI?.(true);
                updateStatusIcon('connected');
            }
        }, 100);
    });
</script>
