const html5QrCode = new Html5Qrcode('qr-reader');
const token = localStorage.getItem("token"); // Retrieve token from storage

if (!token) {
  alert("No token found. Please log in again.");
}

// Function to handle successful scans
function onScanSuccess(studentId) {
  // Check if this is a check-out
  const reason = prompt('Enter reason for check-out (if applicable):');

  // Send studentId and reason to the backend
  fetch('http://localhost:5000/api/scan', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ studentId, reason }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById('scan-result').innerText = `Scanned: ${data.message}`;
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById('scan-result').innerText = 'Error: Failed to log scan.';
    });
}

// Start the QR code scanner
html5QrCode.start(
  { facingMode: 'environment' }, // Use the rear camera
  { fps: 10, qrbox: 250 },
  onScanSuccess
).catch((error) => {
  console.error('Error starting QR scanner:', error);
  document.getElementById('scan-result').innerText = 'Error: Failed to start QR scanner.';
});

// Manual Scan Functionality
function manualScan() {
  const studentId = document.getElementById('manual-student-id').value;
  if (!studentId) {
    alert('Please enter a student ID.');
    return;
  }

  const token = localStorage.getItem("token"); // Retrieve token again to be sure

  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  // Check if this is a check-out
  const reason = prompt('Enter reason for check-out (if applicable):');

  // Send studentId and reason to the backend
  fetch('http://localhost:5000/api/scan', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // ✅ Include the token
    },
    body: JSON.stringify({ studentId, reason }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById('scan-result').innerText = `Scanned: ${data.message}`;
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById('scan-result').innerText = 'Error: Failed to log scan.';
    });
}
