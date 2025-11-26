import { cacheElements, getUserData, showErrorMessage } from "./dom.js";
import { setupWebSocketChannel } from "./websockets.js";
import { setupEventListeners } from "./events.js";

function init() {
    try {
        cacheElements();
        const userData = getUserData();
        setupWebSocketChannel(userData.gelanggang_id);
        setupEventListeners(userData);
    } catch (error) {
        console.error("[DropVerification] Initialization failed:", error);
        showErrorMessage("Failed to initialize drop verification system");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
