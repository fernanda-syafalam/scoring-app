# WebSocket Performance Testing Tools

Professional testing tools for validating WebSocket performance with 20+ concurrent connections.

---

## 🧪 Available Tools

### 1. HTML Load Test Tool (Recommended)

**File:** `websocket-load-test.html`

Visual dashboard for comprehensive WebSocket testing.

**Quick Start:**
```bash
# 1. Start WebSocket server
php artisan websockets:serve --host=0.0.0.0

# 2. Open tool
open websocket-load-test.html

# 3. Click "Start Test"
```

**Features:**
- Real-time metrics dashboard
- Visual connection status grid
- Automatic latency measurement
- Detailed logging console
- Performance reports
- Support for up to 100 connections

---

### 2. Command-Line Test Script

**File:** `websocket-test.sh`

Automated testing via command line.

**Quick Start:**
```bash
# Make executable (first time only)
chmod +x websocket-test.sh

# Run test
./websocket-test.sh --connections 20

# Custom configuration
./websocket-test.sh --host 192.168.1.100 --connections 30
```

**Options:**
- `-h, --host HOST` - WebSocket host (default: 127.0.0.1)
- `-p, --port PORT` - WebSocket port (default: 6001)
- `-n, --connections NUM` - Number of connections (default: 20)
- `--help` - Show help

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Success Rate | 100% |
| Latency (LAN) | <50ms |
| Health Score | >95% |
| Failed Connections | 0 |

---

## 📖 Documentation

**Complete Testing Guide:** `../WEBSOCKET_PERFORMANCE_TESTING.md`

Includes:
- 4 testing methods
- 6 test scenarios
- Performance benchmarks
- Troubleshooting guide
- Sample reports

---

## 🚀 Quick Test (1 Minute)

```bash
# Terminal 1: Start WebSocket
cd ..
php artisan websockets:serve --host=0.0.0.0

# Terminal 2: Run test
cd tests
./websocket-test.sh

# Expected output:
# ✅ EXCELLENT: Performance exceeds requirements!
```

---

## 🎯 Success Criteria

**Test PASSES if:**
- ✅ Success rate ≥95%
- ✅ Latency <100ms
- ✅ Health score >90%
- ✅ 0 failed connections

---

**For more details, see:** `WEBSOCKET_PERFORMANCE_TESTING.md`
