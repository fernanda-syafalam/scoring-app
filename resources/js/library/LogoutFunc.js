// Get logout form element
const logoutForm = document.getElementById("logout-form");

// Clear localStorage when logout button is clicked
if (logoutForm) {
    logoutForm.addEventListener("submit", function () {
        localStorage.clear();
        console.log("🧹 localStorage cleared on logout");
    });
}
