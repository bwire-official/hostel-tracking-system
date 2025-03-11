document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".sidebar-footer a"); // Ensure this targets the logout button

    if (logoutButton) {
        logoutButton.addEventListener("click", async function (e) {
            e.preventDefault();

            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.warn("No token found, redirecting to login...");
                    window.location.href = "../login/studentLogin.html"; // Adjust path if needed
                    return;
                }

                // Send logout request
                const response = await fetch("http://localhost:5000/api/student/logout", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (response.ok) {
                    console.log("Logout successful");
                    localStorage.removeItem("token");
                    window.location.href = "../login/studentLogin.html"; // Redirect to student login
                } else {
                    console.error("Logout failed:", await response.json());
                }
            } catch (error) {
                console.error("Error during logout:", error);
            }
        });
    }
});

console.log("Current Path:", window.location.pathname);
