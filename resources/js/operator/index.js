import { getUserData, getPartaiData, showError } from "./dom.js";
import { setupChannels } from "./websockets.js";
import { setupEventListeners } from "./events.js";
import { loadSavedData } from "./persistence.js";
import { state } from "./state.js";
import { CONFIG } from "./constants.js";

/**
 * Initialize the operator module.
 */
function init() {
    try {
        console.log("🚀 Initializing Operator Module...");

        const userData = getUserData();
        const partaiData = getPartaiData();

        // Store in state for later access
        state.userData = userData;
        state.partaiData = partaiData;

        // Setup WebSocket channels
        setupChannels(userData);

        // Setup UI event listeners
        setupEventListeners();

        // Restore saved state if available
        if (localStorage.getItem(CONFIG.STORAGE.OPERATOR_DATA)) {
            console.log("📦 Restoring saved operator state");
            loadSavedData();
        }

        console.log("✅ Operator Module initialized successfully");
    } catch (error) {
        console.error("❌ Failed to initialize operator module:", error);
        showError("Failed to initialize operator interface");
    }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
