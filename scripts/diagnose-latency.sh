#!/bin/bash

# ============================================================================
# Scoring App - Latency Diagnostics Script
# ============================================================================
# This script identifies the root cause of high latency in real-time scoring
# Usage: bash scripts/diagnose-latency.sh
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}🔍 Scoring App - Latency Diagnostics${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# ============================================================================
# 1. Network Connectivity Test
# ============================================================================
echo -e "${YELLOW}1️⃣  Network Connectivity Test${NC}"
echo "========================================="

if ping -c 1 127.0.0.1 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Localhost is reachable"
else
    echo -e "${RED}✗${NC} Localhost is NOT reachable"
fi

# Check if server is running
if curl -s http://localhost:8000/api/ping > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Laravel app is running on port 8000"
else
    echo -e "${RED}✗${NC} Laravel app is NOT running on port 8000"
fi

# Check if websocket server is running
if curl -s http://localhost:6001/metrics > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} WebSocket server is running on port 6001"
else
    echo -e "${RED}✗${NC} WebSocket server is NOT running on port 6001"
fi

echo ""

# ============================================================================
# 2. HTTP Latency Test
# ============================================================================
echo -e "${YELLOW}2️⃣  HTTP Ping Endpoint Latency${NC}"
echo "========================================="

echo "Testing /api/ping endpoint (10 requests)..."
declare -a latencies
total=0

for i in {1..10}; do
    response_time=$(curl -s -o /dev/null -w "%{time_total}" http://localhost:8000/api/ping)
    latency=$(echo "$response_time * 1000" | bc | cut -d. -f1)
    latencies+=($latency)
    total=$((total + latency))
    printf "Request %2d: ${GREEN}%4d ms${NC}\n" $i $latency
done

avg=$((total / 10))
echo -e "\nAverage latency: ${GREEN}${avg} ms${NC}"

# Find min/max
min=${latencies[0]}
max=${latencies[0]}
for lat in "${latencies[@]}"; do
    [[ $lat -lt $min ]] && min=$lat
    [[ $lat -gt $max ]] && max=$lat
done

echo -e "Min: ${GREEN}${min} ms${NC} | Max: ${RED}${max} ms${NC}"

# Assess latency quality
if [[ $avg -lt 50 ]]; then
    echo -e "Quality: ${GREEN}🟢 Excellent (< 50ms)${NC}"
elif [[ $avg -lt 100 ]]; then
    echo -e "Quality: ${GREEN}🟢 Good (< 100ms)${NC}"
elif [[ $avg -lt 200 ]]; then
    echo -e "Quality: ${YELLOW}🟡 Fair (< 200ms)${NC}"
else
    echo -e "Quality: ${RED}🔴 Poor (> 200ms)${NC}"
fi

echo ""

# ============================================================================
# 3. Server Resources
# ============================================================================
echo -e "${YELLOW}3️⃣  Server Resources${NC}"
echo "========================================="

# CPU Usage
php_cpu=$(ps aux | grep 'php' | grep -v grep | awk '{print $3}' | awk '{sum+=$1} END {print sum}')
echo -e "PHP CPU Usage: ${YELLOW}${php_cpu}%${NC}"

# Memory Usage
if command -v free &> /dev/null; then
    mem_info=$(free -h | grep Mem)
    echo -e "Memory: ${YELLOW}${mem_info}${NC}"
fi

# PHP Processes
php_processes=$(ps aux | grep 'php' | grep -v grep | wc -l)
echo -e "PHP Processes Running: ${YELLOW}${php_processes}${NC}"

# Disk Space
disk_info=$(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 " used)"}')
echo -e "Disk Usage: ${YELLOW}${disk_info}${NC}"

echo ""

# ============================================================================
# 4. Database Connection Test
# ============================================================================
echo -e "${YELLOW}4️⃣  Database Status${NC}"
echo "========================================="

# Check if database is accessible via PHP
php artisan db:monitor 2>/dev/null || {
    echo -e "${RED}✗${NC} Could not connect to database"
    echo "Please verify .env database credentials"
}

echo ""

# ============================================================================
# 5. WebSocket Server Status
# ============================================================================
echo -e "${YELLOW}5️⃣  WebSocket Server Status${NC}"
echo "========================================="

ws_response=$(curl -s http://localhost:6001/metrics 2>/dev/null)
if [[ ! -z "$ws_response" ]]; then
    echo -e "${GREEN}✓${NC} WebSocket server is responding"
    echo "$ws_response" | head -10
else
    echo -e "${RED}✗${NC} WebSocket server is not responding"
fi

echo ""

# ============================================================================
# 6. Configuration Check
# ============================================================================
echo -e "${YELLOW}6️⃣  Configuration Check${NC}"
echo "========================================="

# Check critical .env settings
if grep -q "BROADCAST_DRIVER=pusher" .env 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Broadcasting driver: pusher"
else
    echo -e "${RED}✗${NC} Broadcasting driver not set to pusher"
fi

if grep -q "WEBSOCKET_STATISTICS=false" .env 2>/dev/null; then
    echo -e "${GREEN}✓${NC} WebSocket statistics: disabled (optimized)"
elif grep -q "WEBSOCKET_STATISTICS=true" .env 2>/dev/null; then
    echo -e "${YELLOW}⚠${NC} WebSocket statistics: enabled (may impact latency)"
fi

echo ""

# ============================================================================
# 7. Recommendations
# ============================================================================
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}📋 Recommendations${NC}"
echo -e "${BLUE}============================================${NC}"

if [[ $avg -gt 500 ]]; then
    echo -e "${RED}CRITICAL LATENCY DETECTED${NC}"
    echo ""
    echo "Immediate actions to take:"
    echo "1. Check network connectivity: ping $(hostname -I)"
    echo "2. Verify no firewall rules blocking ports 8000/6001"
    echo "3. Check server load: top"
    echo "4. Review Laravel logs: tail -f storage/logs/laravel.log"
    echo "5. Restart WebSocket server: php artisan websockets:serve"
elif [[ $avg -gt 200 ]]; then
    echo -e "${YELLOW}HIGH LATENCY DETECTED${NC}"
    echo ""
    echo "Recommended optimizations:"
    echo "1. Disable WebSocket statistics: WEBSOCKET_STATISTICS=false"
    echo "2. Increase WebSocket capacity: WEBSOCKET_MAX_CONNECTIONS=500"
    echo "3. Check database performance: php artisan tinker"
    echo "4. Monitor system resources: watch -n 1 'free -h; ps aux | grep php'"
else
    echo -e "${GREEN}Latency is within acceptable range${NC}"
fi

echo ""
echo -e "${BLUE}============================================${NC}"
echo "Diagnostics complete!"
echo -e "${BLUE}============================================${NC}"
