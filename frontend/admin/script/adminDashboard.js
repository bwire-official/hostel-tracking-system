const hamburger = document.querySelector(".toggle-btn");


const toggler = document.querySelector("#iconic");

hamburger.addEventListener("click", function(){
    document.querySelector("#sidebar").classList.toggle("expand")
    toggler.classList.toggle("bx-chevrons-right")
    toggler.classList.toggle("bx-chevrons-left")
})

//Dark mode


document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const sidebar = document.getElementById("sidebar");

    // Check if dark mode was previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    }

    darkModeToggle.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default link behavior

        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark-mode");
        sidebar.classList.add("bg-dark", "text-light");

        // Apply dark mode styles to all containers
        document.querySelectorAll(".card, .navbar, .container, .content").forEach(el => {
            el.classList.add("bg-dark", "text-light");
        });

        // Change full page background
        document.documentElement.style.backgroundColor = "#121212"; // Ensures full dark mode
        body.style.backgroundColor = "#121212";

        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        sidebar.classList.remove("bg-dark", "text-light");

        document.querySelectorAll(".card, .navbar, .container, .content").forEach(el => {
            el.classList.remove("bg-dark", "text-light");
        });

        // Reset full page background
        document.documentElement.style.backgroundColor = ""; // Restores default light mode
        body.style.backgroundColor = "";

        localStorage.setItem("darkMode", "disabled");
    }
});






// Data retrieval simulation

function fetchData() {
    // Simulating data retrieval (replace with API call later)
    const totalStudents = Math.floor(Math.random() * 100) + 50; 

    // Injecting values into HTML
    document.getElementById("studentCountPresent").textContent = totalStudents;
    
}

// Simulate fetching data every 5 seconds
setInterval(fetchData, 5000);

// Initial fetch
fetchData();