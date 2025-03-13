// Form Switching Logic
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");

function loginFunction() {
  loginForm.style.left = "50%";
  loginForm.style.opacity = 1;
  registerForm.style.left = "150%";
  registerForm.style.opacity = 0;
  wrapper.style.height = "500px";
  loginTitle.style.top = "50%";
  loginTitle.style.opacity = 1;
  registerTitle.style.top = "50px";
  registerTitle.style.opacity = 0;
}

function registerFunction() {
  loginForm.style.left = "-50%";
  loginForm.style.opacity = 0;
  registerForm.style.left = "50%";
  registerForm.style.opacity = 1;
  wrapper.style.height = "580px";
  loginTitle.style.top = "-60px";
  loginTitle.style.opacity = 0;
  registerTitle.style.top = "50%";
  registerTitle.style.opacity = 1;
}

// ✅ Updated API Base URL
import API_BASE from "../config.js";

console.log("✅ Using API base URL:", API_BASE);

// ✅ Login Form Submission with Validation
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("log-email").value.trim();
  const password = document.getElementById("log-pass").value.trim();

  if (!username || !password) {
    alert("⚠️ Please enter both username and password.");
    return;
  }

  try {
    // Try admin login first
    const adminResponse = await fetch(`${API_BASE}/api/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const adminData = await adminResponse.json();

    if (adminResponse.ok && adminData.token) {
      localStorage.setItem("token", adminData.token);
      localStorage.setItem("role", "admin");
      window.location.href = "../admin/admin-dashboard.html";
      return;
    }

    // If admin login fails, try student login
    const studentResponse = await fetch(`${API_BASE}/api/auth/student/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: username, password }),
    });

    const studentData = await studentResponse.json();

    if (studentResponse.ok && studentData.token) {
      localStorage.setItem("token", studentData.token);
      localStorage.setItem("role", "student");
      window.location.href = "../student/student-dashboard.html";
      return;
    }

    alert("❌ Invalid credentials");
  } catch (error) {
    console.error("Login error:", error);
    alert("❌ Failed to login. Please check your connection.");
  }
});

// ✅ Register Form Submission with Validation
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-pass").value.trim();

  if (!username || !email || !password) {
    alert("⚠️ Please fill all fields.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/api/auth/student/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: email, name: username, password, roomNumber: "N/A" }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Registration successful! You can now log in.");
      loginFunction();
    } else {
      alert(`❌ Registration failed: ${data.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("❌ Failed to register. Please check your connection.");
  }
});
