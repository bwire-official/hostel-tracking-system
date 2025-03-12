// Ensure the button exists before adding event listener

document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("download-qr-btn");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", downloadQRCode);
    }
});

async function downloadQRCode() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to download your QR code.");
            return;
        }

        // Fetch student details & QR code
        const response = await fetch("http://localhost:5000/api/student/details", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch student data: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full Data Response:", data);

        const { qrCode, name, studentId, roomNumber = "Not Assigned" } = data;

        if (!qrCode || !name || !studentId) {
            alert("Incomplete student data. Please try again later.");
            return;
        }

        // Generate PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add text to PDF
        doc.setFontSize(16);
        doc.text("Hostel QR Code", 80, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${name}`, 20, 40);
        doc.text(`ID: ${studentId}`, 20, 50);
        doc.text(`Room Number: ${roomNumber}`, 20, 60);

        // Load and display QR code
        const qrImg = new Image();
        qrImg.src = qrCode;
        qrImg.onload = function () {
            doc.addImage(qrImg, "PNG", 50, 70, 100, 100);
            doc.text("Scan Here", 90, 180);
            doc.save(`QR_Code_${name}.pdf`);
        };

        // Show success message
        alert("✅ QR Code PDF downloaded successfully!");

    } catch (error) {
        console.error("Error downloading QR code:", error);
        alert("An error occurred while downloading the QR code.");
    }
}
