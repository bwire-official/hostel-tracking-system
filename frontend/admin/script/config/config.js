const API_BASE = 
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://hostel-tracking-system.onrender.com";

export default API_BASE;
