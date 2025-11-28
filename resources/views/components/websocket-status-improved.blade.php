{{-- WebSocket Connection Status Indicator - Enhanced Version --}}
{{-- This is an improved version with better UX, accessibility, and code quality --}}

<div id="ws-indicator-container" class="fixed bottom-40 left-1/2 z-50 mx-4 w-[calc(100%-2rem)] -translate-x-1/2 transform md:mx-0 md:w-auto" role="status" aria-live="polite"
    aria-label="WebSocket connection status indicator">

    <div class="flex min-w-max items-center justify-center gap-4 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white shadow-lg transition-all duration-300 hover:bg-gray-800">

        {{-- Status Icon with better visual feedback --}}
        <div class="flex items-center gap-2">
            {{-- Animated status indicator dot --}}
            <div class="ws-indicator-dot relative flex h-3 w-3">
                {{-- Outer pulsing ring for emphasis --}}
                <span class="absolute inset-0 animate-pulse rounded-full opacity-60" style="background: inherit;"></span>

                {{-- Inner solid dot --}}
                <span class="relative block h-full w-full rounded-full bg-gray-400"></span>
            </div>

            {{-- Status text with better hierarchy --}}
            <div class="flex flex-col gap-0.5">
                <span class="ws-status-text text-xs font-semibold uppercase tracking-wide">
                    Menghubungkan...
                </span>
                <span class="ws-status-detail hidden text-xs text-gray-400 sm:inline">
                    {{-- Secondary info: latency or reconnect attempt --}}
                </span>
            </div>
        </div>

        {{-- Separator --}}
        <div class="h-6 w-px bg-gray-600 opacity-50"></div>

        {{-- Latency Display with Quality Indicator --}}
        <div class="ws-quality-section flex hidden items-center gap-2">
            {{-- Latency value and unit --}}
            <div class="text-right">
                <div class="text-xs text-gray-400">Latency</div>
                <span class="ws-latency-value font-mono text-sm font-bold text-white">--ms</span>
            </div>

            {{-- Quality badge --}}
            <span class="ws-quality-badge rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
                --
            </span>
        </div>

        {{-- Separator before action button --}}
        <div class="ws-reconnect-btn hidden h-6 w-px bg-gray-600 opacity-50"></div>

        {{-- Reconnect Button - Modern style with proper event handling --}}
        <button type="button" id="ws-reconnect-button"
            class="ws-reconnect-btn hidden rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            title="Click to manually reconnect to the server" aria-label="Reconnect to WebSocket server">
            <svg class="mr-1.5 inline h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Sambungkan Ulang</span>
        </button>

        {{-- Screen reader only text for detailed status --}}
        <span class="ws-sr-only sr-only" id="ws-sr-text" aria-live="assertive" aria-atomic="true">
            Terhubung ke server
        </span>
    </div>

    {{-- Status indicator tooltip (optional) --}}
    <div id="ws-tooltip" class="pointer-events-none absolute -top-8 left-1/2 z-50 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white">
        {{-- Tooltip content populated by JS --}}
    </div>
</div>

<style>
    {{-- Utility classes for better maintainability --}} .sr-only {
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

    {{-- Smooth color transitions for status changes --}} .ws-indicator-dot {
        transition: color 0.3s ease-in-out;
    }

    {{-- Focus styles for accessibility --}} button:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
</style>

<script>
    {{-- Enhanced event handling and state management --}}

    // Status icon configurations with colors and accessibility
    const STATUS_CONFIG = {
        connecting: {
            icon: 'connecting',
            text: 'Menghubungkan',
            detail: '',
            color: 'text-gray-400',
            bgColor: 'bg-gray-400'
        },
        connected: {
            icon: 'connected',
            text: 'Terhubung',
            detail: 'Server terhubung',
            color: 'text-green-500',
            bgColor: 'bg-green-500'
        },
        reconnecting: {
            icon: 'reconnecting',
            text: 'Menghubung Ulang',
            detail: 'Mencoba terhubung',
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500'
        },
        disconnected: {
            icon: 'disconnected',
            text: 'Terputus',
            detail: 'Koneksi terputus',
            color: 'text-red-500',
            bgColor: 'bg-red-500'
        }
    };

    // Latency quality thresholds
    const LATENCY_QUALITY = {
        excellent: {
            max: 50,
            label: 'Sempurna',
            color: 'bg-green-600'
        },
        good: {
            max: 100,
            label: 'Bagus',
            color: 'bg-blue-600'
        },
        fair: {
            max: 200,
            label: 'Sedang',
            color: 'bg-yellow-600'
        },
        poor: {
            max: Infinity,
            label: 'Buruk',
            color: 'bg-red-600'
        }
    };

    /**
     * Get latency quality level
     * @param {number} latencyMs - Latency in milliseconds
     * @returns {object} Quality level info
     */
    function getLatencyQuality(latencyMs) {
        for (const [level, config] of Object.entries(LATENCY_QUALITY)) {
            if (latencyMs <= config.max) {
                return {
                    level,
                    ...config
                };
            }
        }
        return LATENCY_QUALITY.poor;
    }

    /**
     * Update status icon color
     * @param {string} status - Connection status
     */
    function updateStatusIcon(status) {
        const config = STATUS_CONFIG[status] || STATUS_CONFIG.disconnected;
        const dotElement = document.querySelector('.ws-indicator-dot');
        if (dotElement) {
            dotElement.className = `ws-indicator-dot relative flex h-3 w-3 ${config.bgColor}`;
            dotElement.querySelector('span:last-child')?.classList.forEach(cls => {
                if (cls.startsWith('bg-')) dotElement.querySelector('span:last-child').classList.remove(cls);
            });
            dotElement.querySelector('span:last-child')?.classList.add(config.bgColor);
        }
    }

    /**
     * Update latency quality badge
     * @param {number} latencyMs - Latency in milliseconds
     */
    function updateLatencyDisplay(latencyMs) {
        const quality = getLatencyQuality(latencyMs);
        const badgeElement = document.querySelector('.ws-quality-badge');
        const valueElement = document.querySelector('.ws-latency-value');

        if (badgeElement) {
            badgeElement.textContent = quality.label;
            badgeElement.className = `ws-quality-badge text-xs px-2 py-1 rounded-full
                                     font-medium text-white ${quality.color}`;
        }

        if (valueElement) {
            valueElement.textContent = `${latencyMs}ms`;
        }
    }

    /**
     * Update screen reader text
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
                text = `Terhubung ke server dengan latency ${latencyMs}ms`;
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

    // Event listener for WebSocket status changes
    window.addEventListener('websocket-status', function(event) {
        const {
            isConnected,
            latency,
            reconnectAttempts
        } = event.detail;

        // Update screen reader text
        const status = isConnected ? 'connected' :
            reconnectAttempts > 0 ? 'reconnecting' : 'disconnected';
        updateScreenReaderText(status, latency, reconnectAttempts);

        // Update visual indicators
        if (isConnected) {
            updateStatusIcon('connected');
        }
    });

    // Reconnect button event listener (replacing inline onclick)
    document.getElementById('ws-reconnect-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        this.disabled = true;
        this.setAttribute('aria-busy', 'true');

        // Call manual reconnect
        window.manualReconnect?.();

        // Re-enable button after 2 seconds
        setTimeout(() => {
            this.disabled = false;
            this.setAttribute('aria-busy', 'false');
        }, 2000);
    });

    // Initialize on page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (window.Echo?.connector?.pusher?.connection?.state === 'connected') {
                window.wsConnectionState.isConnected = true;
                window.updateConnectionUI?.(true);
            }
        }, 100);
    });
</script>
