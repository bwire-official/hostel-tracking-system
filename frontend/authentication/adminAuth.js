import API_BASE from "../config.js";
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".sidebar-footer a");

    if (logoutButton) {
        logoutButton.addEventListener("click", async function (e) {
            e.preventDefault();

            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.warn("No token found, redirecting to login...");
                    window.location.href = "/frontend/login/login.html"; // ✅ Fixed path
                    return;
                }

                // Send logout request
                const response = await fetch(`${API_BASE}/api/admin/logout`, {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    console.log("Logout successful");
                    localStorage.removeItem("token");
                    window.location.href = "/frontend/login/login.html"; // ✅ Fixed path
                } else {
                    const errorResponse = await response.json();
                    console.error("Logout failed:", errorResponse);
                }
            } catch (error) {
                console.error("Error during logout:", error);
            }
        });
    }
});

console.log("Current Path:", window.location.pathname);
