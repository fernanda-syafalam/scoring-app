#!/bin/bash

################################################################################
# WebSocket Performance Test Script
# Tests WebSocket server with multiple concurrent connections
################################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default configuration
WS_HOST="127.0.0.1"
WS_PORT="6001"
APP_KEY="scoring"
NUM_CONNECTIONS=20
TEST_DURATION=60

# Results
SUCCESSFUL=0
FAILED=0

################################################################################
# Functions
################################################################################

print_header() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║       WebSocket Performance Test Script                   ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_config() {
    echo -e "${YELLOW}Configuration:${NC}"
    echo "  WebSocket Host: $WS_HOST"
    echo "  WebSocket Port: $WS_PORT"
    echo "  App Key: $APP_KEY"
    echo "  Connections: $NUM_CONNECTIONS"
    echo "  Duration: ${TEST_DURATION}s"
    echo ""
}

check_dependencies() {
    echo -e "${YELLOW}Checking dependencies...${NC}"

    # Check if curl is available
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}✗ curl not found. Please install curl.${NC}"
        exit 1
    fi

    # Check if nc (netcat) is available
    if ! command -v nc &> /dev/null; then
        echo -e "${RED}✗ netcat not found. Please install netcat.${NC}"
        exit 1
    fi

    # Check if websocat is available (optional but recommended)
    if command -v websocat &> /dev/null; then
        echo -e "${GREEN}✓ websocat found (will use for WebSocket testing)${NC}"
        USE_WEBSOCAT=true
    else
        echo -e "${YELLOW}! websocat not found (install with: brew install websocat)${NC}"
        echo -e "${YELLOW}! Will use basic port check instead${NC}"
        USE_WEBSOCAT=false
    fi

    echo ""
}

check_websocket_server() {
    echo -e "${YELLOW}Checking WebSocket server...${NC}"

    # Test if port is open
    if nc -z -w 2 $WS_HOST $WS_PORT 2>/dev/null; then
        echo -e "${GREEN}✓ WebSocket server is running on $WS_HOST:$WS_PORT${NC}"
        return 0
    else
        echo -e "${RED}✗ WebSocket server is NOT running on $WS_HOST:$WS_PORT${NC}"
        echo ""
        echo "Please start the WebSocket server first:"
        echo "  php artisan websockets:serve --host=0.0.0.0"
        echo ""
        exit 1
    fi
}

test_single_connection() {
    local conn_id=$1
    local log_file="/tmp/ws-test-$conn_id.log"

    if [ "$USE_WEBSOCAT" = true ]; then
        # Use websocat for proper WebSocket testing
        timeout 5 websocat "ws://$WS_HOST:$WS_PORT/app/$APP_KEY?protocol=7" \
            -E --text 2>&1 | head -1 > "$log_file" &

        local pid=$!
        sleep 2

        if ps -p $pid > /dev/null 2>&1; then
            kill $pid 2>/dev/null
            wait $pid 2>/dev/null
            SUCCESSFUL=$((SUCCESSFUL + 1))
            echo -e "${GREEN}✓${NC} Connection #$conn_id"
            rm -f "$log_file"
            return 0
        else
            FAILED=$((FAILED + 1))
            echo -e "${RED}✗${NC} Connection #$conn_id"
            rm -f "$log_file"
            return 1
        fi
    else
        # Fallback: just test port connectivity
        if nc -z -w 2 $WS_HOST $WS_PORT 2>/dev/null; then
            SUCCESSFUL=$((SUCCESSFUL + 1))
            echo -e "${GREEN}✓${NC} Connection #$conn_id"
            return 0
        else
            FAILED=$((FAILED + 1))
            echo -e "${RED}✗${NC} Connection #$conn_id"
            return 1
        fi
    fi
}

run_connection_test() {
    echo -e "${YELLOW}Testing $NUM_CONNECTIONS concurrent connections...${NC}"
    echo ""

    local start_time=$(date +%s)

    # Create connections with slight delay between each
    for i in $(seq 1 $NUM_CONNECTIONS); do
        test_single_connection $i &
        sleep 0.1  # 100ms delay between connections

        # Show progress every 5 connections
        if [ $((i % 5)) -eq 0 ]; then
            echo -e "${BLUE}  Progress: $i/$NUM_CONNECTIONS...${NC}"
        fi
    done

    # Wait for all background jobs
    wait

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    echo ""
    echo -e "${YELLOW}Test completed in ${duration}s${NC}"
    echo ""
}

check_websocket_stats() {
    echo -e "${YELLOW}Fetching WebSocket statistics...${NC}"
    echo ""

    # Try to get stats from Laravel
    if [ -f "artisan" ]; then
        php artisan websockets:stats 2>/dev/null || echo "  (Stats not available)"
    else
        echo "  (Run from project root to see Laravel WebSocket stats)"
    fi

    echo ""
}

measure_latency() {
    echo -e "${YELLOW}Measuring connection latency...${NC}"

    local total_time=0
    local num_samples=5

    for i in $(seq 1 $num_samples); do
        # Use Python for millisecond precision (macOS date doesn't support %3N)
        local start=$(python3 -c 'import time; print(int(time.time() * 1000))')
        nc -z -w 2 $WS_HOST $WS_PORT 2>/dev/null
        local end=$(python3 -c 'import time; print(int(time.time() * 1000))')
        local latency=$((end - start))
        total_time=$((total_time + latency))
        echo "  Sample $i: ${latency}ms"
    done

    local avg_latency=$((total_time / num_samples))
    echo ""
    echo -e "  ${BLUE}Average Latency: ${avg_latency}ms${NC}"
    echo ""
}

print_results() {
    local total=$((SUCCESSFUL + FAILED))
    local success_rate=0

    if [ $total -gt 0 ]; then
        success_rate=$((SUCCESSFUL * 100 / total))
    fi

    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                    TEST RESULTS                            ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "  Total Attempted:      $total"
    echo -e "  ${GREEN}Successful:           $SUCCESSFUL${NC}"

    if [ $FAILED -gt 0 ]; then
        echo -e "  ${RED}Failed:               $FAILED${NC}"
    else
        echo "  Failed:               $FAILED"
    fi

    echo "  Success Rate:         ${success_rate}%"
    echo ""

    # Performance assessment
    if [ $SUCCESSFUL -ge 20 ] && [ $FAILED -eq 0 ]; then
        echo -e "${GREEN}✅ EXCELLENT: Performance exceeds requirements!${NC}"
        echo -e "${GREEN}   Your WebSocket setup is production-ready.${NC}"
    elif [ $SUCCESSFUL -ge 15 ] && [ $success_rate -ge 90 ]; then
        echo -e "${GREEN}✓ GOOD: Performance meets requirements${NC}"
        echo -e "${GREEN}   Acceptable for production use.${NC}"
    elif [ $SUCCESSFUL -ge 10 ]; then
        echo -e "${YELLOW}⚠ ACCEPTABLE: Performance is marginal${NC}"
        echo -e "${YELLOW}   Consider optimization before production.${NC}"
    else
        echo -e "${RED}❌ POOR: Performance below requirements${NC}"
        echo -e "${RED}   Please troubleshoot issues before deployment.${NC}"
    fi

    echo ""
}

print_recommendations() {
    echo -e "${BLUE}Recommendations:${NC}"
    echo ""

    if [ "$USE_WEBSOCAT" = false ]; then
        echo -e "${YELLOW}  • Install websocat for better WebSocket testing:${NC}"
        echo "    brew install websocat"
        echo ""
    fi

    echo "  • For more detailed testing, use the HTML load test tool:"
    echo "    open tests/websocket-load-test.html"
    echo ""

    echo "  • Monitor real-time metrics in browser console:"
    echo "    wsHealth()"
    echo ""

    echo "  • Check WebSocket server stats:"
    echo "    php artisan websockets:stats"
    echo ""

    echo "  • See full testing guide:"
    echo "    cat WEBSOCKET_PERFORMANCE_TESTING.md"
    echo ""
}

show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --host HOST        WebSocket host (default: 127.0.0.1)"
    echo "  -p, --port PORT        WebSocket port (default: 6001)"
    echo "  -k, --key KEY          App key (default: scoring)"
    echo "  -n, --connections NUM  Number of connections (default: 20)"
    echo "  -d, --duration SEC     Test duration in seconds (default: 60)"
    echo "  --help                 Show this help message"
    echo ""
    echo "Example:"
    echo "  $0 --host 192.168.1.100 --connections 30"
    echo ""
}

################################################################################
# Main Script
################################################################################

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--host)
            WS_HOST="$2"
            shift 2
            ;;
        -p|--port)
            WS_PORT="$2"
            shift 2
            ;;
        -k|--key)
            APP_KEY="$2"
            shift 2
            ;;
        -n|--connections)
            NUM_CONNECTIONS="$2"
            shift 2
            ;;
        -d|--duration)
            TEST_DURATION="$2"
            shift 2
            ;;
        --help)
            show_usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Run the test
print_header
print_config
check_dependencies
check_websocket_server
measure_latency
run_connection_test
check_websocket_stats
print_results
print_recommendations

# Clean up temp files
rm -f /tmp/ws-test-*.log 2>/dev/null

echo -e "${GREEN}Test complete!${NC}"
echo ""
