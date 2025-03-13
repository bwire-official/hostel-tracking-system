import API_BASE from "./config/config.js";
const hamburger = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#iconic");

hamburger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
    toggler.classList.toggle("bx-chevrons-right");
    toggler.classList.toggle("bx-chevrons-left");
});

// Dark mode functionality
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const sidebar = document.getElementById("sidebar");

    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    }

    darkModeToggle.addEventListener("click", function (e) {
        e.preventDefault();
        body.classList.contains("dark-mode") ? disableDarkMode() : enableDarkMode();
    });

    function enableDarkMode() {
        body.classList.add("dark-mode");
        sidebar.classList.add("bg-dark", "text-light");
        document.querySelectorAll(".card, .navbar, .container, .content").forEach(el => {
            el.classList.add("bg-dark", "text-light");
        });
        document.documentElement.style.backgroundColor = "#121212";
        body.style.backgroundColor = "#121212";
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        sidebar.classList.remove("bg-dark", "text-light");
        document.querySelectorAll(".card, .navbar, .container, .content").forEach(el => {
            el.classList.remove("bg-dark", "text-light");
        });
        document.documentElement.style.backgroundColor = "";
        body.style.backgroundColor = "";
        localStorage.setItem("darkMode", "disabled");
    }
});

// Fetch and display recent logs
async function fetchLogs() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Admin must log in.");
            return;
        }

        const response = await fetch(`${API_BASE}/api/admin/logs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch logs");
        }

        const logs = await response.json();
        const logsTableBody = document.getElementById("logsTableBody");

        // Clear existing logs
        logsTableBody.innerHTML = "";

        logs.forEach(log => {
            const studentName = log.studentName || "Unknown"; // Get student name from backend response
            const studentId = log.studentId || "N/A"; // Get student ID from backend response
            const dateObj = new Date(log.timestamp);
            const formattedDate = dateObj.toLocaleDateString();
            const formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
            const type = log.type.charAt(0).toUpperCase() + log.type.slice(1); // Capitalize first letter
            const reason = log.type === "check-out" ? log.reason || "NIL" : "NIL";

            const row = `
                <tr>
                    <td>${studentName}</td>
                    <td>${studentId}</td>
                    <td>${formattedDate}</td>
                    <td>${formattedTime}</td>
                    <td>${type}</td>
                    <td>${reason}</td>
                </tr>
            `;
            logsTableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}

// Refresh logs every 10 seconds
setInterval(fetchLogs, 10000);
fetchLogs();

