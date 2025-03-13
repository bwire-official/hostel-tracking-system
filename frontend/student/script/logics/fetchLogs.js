import API_BASE from "./config.js";
async function fetchStudentLogs() {
    try {
        const response = await fetch(`${API_BASE}/api/student/logs`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const logs = await response.json();
        displayLogs(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        alert('Failed to fetch logs. Please try again.');
    }
}

function displayLogs(logs) {
    const logsTableBody = document.getElementById('logsTableBody');
    logsTableBody.innerHTML = ''; // Clear previous logs

    logs.forEach(log => {
        const logDate = new Date(log.timestamp).toLocaleDateString();
        const logTime = new Date(log.timestamp).toLocaleTimeString();

        const row = `
            <tr>
                <td>${log.studentId}</td>  
                <td>${logDate}</td>
                <td>${logTime}</td>
                <td>${log.type}</td>
                <td>${log.reason ? log.reason : 'N/A'}</td>
            </tr>
        `;

        logsTableBody.innerHTML += row;
    });
}

fetchStudentLogs();
setInterval(fetchStudentLogs, 5000); // Refresh logs every 5 seconds
