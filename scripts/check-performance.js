#!/usr/bin/env node

/**
 * ============================================================================
 * Scoring App - Real-Time Performance Monitor
 * ============================================================================
 * Quick performance check that can be run from Node.js or browser console
 * Usage:
 *   Node: node scripts/check-performance.js
 *   Browser: Copy to console and run
 * ============================================================================
 */

const http = require('http');

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

/**
 * Measure HTTP request latency
 */
function measureLatency(host, port, path) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const req = http.request(
            {
                hostname: host,
                port: port,
                path: path,
                method: 'HEAD',
                timeout: 5000,
            },
            (res) => {
                const latency = Date.now() - startTime;
                resolve({
                    status: res.statusCode,
                    latency,
                    success: res.statusCode === 200 || res.statusCode === 204,
                });
            }
        );

        req.on('error', () => {
            resolve({
                status: 'ERROR',
                latency: Date.now() - startTime,
                success: false,
            });
        });

        req.end();
    });
}

/**
 * Get quality rating based on latency
 */
function getQuality(latency) {
    if (latency < 50) return { label: 'Excellent', emoji: '🟢', color: colors.green };
    if (latency < 100) return { label: 'Good', emoji: '🟢', color: colors.green };
    if (latency < 200) return { label: 'Fair', emoji: '🟡', color: colors.yellow };
    if (latency < 500) return { label: 'Poor', emoji: '🔴', color: colors.yellow };
    return { label: 'Critical', emoji: '🔴', color: colors.red };
}

/**
 * Main performance check
 */
async function checkPerformance() {
    console.log(
        `${colors.blue}${'='.repeat(60)}${colors.reset}`
    );
    console.log(
        `${colors.blue}🚀 Scoring App - Performance Monitor${colors.reset}`
    );
    console.log(
        `${colors.blue}${'='.repeat(60)}${colors.reset}\n`
    );

    const endpoints = [
        { name: 'Laravel App', host: 'localhost', port: 8000, path: '/api/ping' },
        { name: 'WebSocket Server', host: 'localhost', port: 6001, path: '/metrics' },
    ];

    const results = [];

    // Test each endpoint
    for (const endpoint of endpoints) {
        console.log(`Testing ${endpoint.name}...`);
        const measurements = [];

        // Run 5 measurements
        for (let i = 0; i < 5; i++) {
            const result = await measureLatency(
                endpoint.host,
                endpoint.port,
                endpoint.path
            );
            measurements.push(result);

            const quality = getQuality(result.latency);
            console.log(
                `  Request ${i + 1}: ${quality.color}${result.latency}ms${colors.reset} ${
                    result.success ? '✓' : '✗'
                }`
            );
        }

        // Calculate statistics
        const successful = measurements.filter((m) => m.success);
        const latencies = successful.map((m) => m.latency);
        const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
        const min = Math.min(...latencies);
        const max = Math.max(...latencies);

        const quality = getQuality(avg);

        results.push({
            name: endpoint.name,
            avg,
            min,
            max,
            quality,
            success: successful.length === 5,
        });

        console.log(
            `  ${quality.emoji} ${quality.color}${quality.label}${colors.reset} (avg: ${avg.toFixed(0)}ms, min: ${min}ms, max: ${max}ms)\n`
        );
    }

    // Summary
    console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.blue}📊 Summary${colors.reset}`);
    console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}`);

    for (const result of results) {
        const icon = result.success ? '✓' : '✗';
        console.log(
            `${result.quality.color}${icon} ${result.name}: ${result.avg.toFixed(0)}ms ${result.quality.emoji}${colors.reset}`
        );
    }

    // Recommendations
    console.log(`\n${colors.cyan}💡 Recommendations:${colors.reset}`);

    const allGood = results.every((r) => r.quality.label === 'Excellent' || r.quality.label === 'Good');

    if (allGood) {
        console.log('✓ All endpoints performing well!');
    } else {
        console.log('⚠ Performance issues detected:');
        for (const result of results) {
            if (result.quality.label !== 'Excellent' && result.quality.label !== 'Good') {
                console.log(
                    `  - ${result.name}: ${result.quality.label} (${result.avg.toFixed(0)}ms)`
                );
                console.log('    Run: bash scripts/diagnose-latency.sh');
            }
        }
    }

    console.log(
        `\n${colors.blue}${'='.repeat(60)}${colors.reset}\n`
    );
}

// Run if executed directly
if (require.main === module) {
    checkPerformance().catch(console.error);
}

module.exports = { measureLatency, getQuality, checkPerformance };
