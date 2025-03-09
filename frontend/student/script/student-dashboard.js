(function () {
  const token = localStorage.getItem('token');
  if (!token) {
      alert('Please log in to view your QR code.');
      window.location.href = '/frontend/login/login.html';
      return;
  }

  console.log('Token:', token); // Debugging: Log the token

  // Fetch student QR code
  fetch('http://localhost:5000/api/student/qrcode', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then((data) => {
          console.log('QR Code Data:', data); // Debugging: Log the response data
          if (data.qrCode) {
              document.getElementById('qr-code-image').src = data.qrCode;
          } else {
              alert('QR code not found.');
          }
      })
      .catch((error) => {
          console.error('Error fetching QR code:', error);
          alert('Failed to fetch QR code. Please try again.');
      });
})();

// Fetch and display student check-in/check-out logs
async function fetchStudentLogs() {
  try {
      const response = await fetch('http://localhost:5000/api/student/logs', {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
      });
      const logs = await response.json();
      displayLogs(logs);
  } catch (error) {
      console.error('Error fetching logs:', error);
      alert('Failed to fetch logs. Please try again.');
  }
}

function displayLogs(logs) {
  const logsList = document.getElementById('logs-list');
  logsList.innerHTML = logs.map(log => `
      <li>
          <strong>${log.type}</strong> at ${new Date(log.timestamp).toLocaleString()}
          ${log.reason ? `<br><em>Reason: ${log.reason}</em>` : ''}
      </li>
  `).join('');
}
fetchStudentLogs();

// Sidebar toggle functionality
const hamburger = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#iconic");
hamburger.addEventListener("click", function(){
  document.querySelector("#sidebar").classList.toggle("expand")
  toggler.classList.toggle("bx-chevrons-right")
  toggler.classList.toggle("bx-chevrons-left")
});

// Activity chart
const ctx = document.getElementById("learningChart").getContext("2d");
let activityData = {
  labels: [],
  datasets: [{
      label: "Activity Level",
      data: [],
      backgroundColor: "rgba(11, 15, 25, 0.5)",
      borderColor: "#0b0f19",
      borderWidth: 2,
      fill: true,
  }],
};
let learningChart = new Chart(ctx, {
  type: "line",
  data: activityData,
  options: {
      animation: { duration: 800 },
      responsive: true,
      scales: {
          x: { title: { display: true, text: "Time" } },
          y: { title: { display: true, text: "Activity Score" }, min: 0, max: 100 },
      },
  },
});
function updateChart() {
  let now = new Date();
  let timeLabel = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  let newActivityValue = Math.floor(Math.random() * 100);
  if (activityData.labels.length >= 10) {
      activityData.labels.shift();
      activityData.datasets[0].data.shift();
  }
  activityData.labels.push(timeLabel);
  activityData.datasets[0].data.push(newActivityValue);
  learningChart.update();
}
setInterval(updateChart, 2000);

// Check-in stats & daily challenge
document.addEventListener("DOMContentLoaded", function () {
  let checkInCount = Math.floor(Math.random() * 20) + 10;
  let checkOutCount = checkInCount + (Math.random() > 0.5 ? 1 : -1);
  if (Math.abs(checkInCount - checkOutCount) > 2) {
      checkOutCount = checkInCount;
  }
  document.getElementById("checkInCount").textContent = checkInCount;
  document.getElementById("checkOutCount").textContent = checkOutCount;
  let checkInPercentage = (checkInCount / 30) * 100;
  let progressBar = document.getElementById("checkInProgress");
  progressBar.style.width = checkInPercentage + "%";
  progressBar.textContent = Math.round(checkInPercentage) + "%";
  const forToday = [
      "You have a working brain and a working heart, use them wisely. 😃",
      "Let who made you define you 🙂",
      "Everything begins at 12:15AM 🌿",
      "Forgive that one person and free your mind! 😎",
      "You won't be the best at everything, but you will be the best at something!😉",
      "Take your time with life, learn the lessons heal and grow ❤",
      "If you like, give up. Hehehe 😐",
      "We no really send you for here 🤺",
      "Don't go for class...sleep tight 😊"
  ];
  document.getElementById("dailyChallenge").textContent = forToday[Math.floor(Math.random() * forToday.length)];
});

// Modal display functionality
function showModal(modalId) {
  var modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}
document.getElementById("seeProf").addEventListener("click", function() {
  showModal("profileModal");
});
document.getElementById("logComp").addEventListener("click", function() {
  showModal("complaintModal");
});
document.getElementById("complaintForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let planeIcon = document.getElementById("planeIcon");
  planeIcon.classList.add("flying");
  setTimeout(() => {
      planeIcon.classList.remove("flying");
      alert("Complaint lodged successfully!");
  }, 1000);
});






//version --1--


// (function () {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     alert('Please log in to view your QR code.');
//     window.location.href = '/frontend/login/login.html';
//     return;
//   }

//   console.log('Token:', token); // Debugging: Log the token

//   fetch('http://localhost:5000/api/student/qrcode', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log('QR Code Data:', data); // Debugging: Log the response data
//       if (data.qrCode) {
//         document.getElementById('qr-code-image').src = data.qrCode;
//       } else {
//         alert('QR code not found.');
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching QR code:', error);
//       alert('Failed to fetch QR code. Please try again.');
//     });
// })();

// async function fetchStudentLogs() {
//   try {
//     const response = await fetch('http://localhost:5000/api/student/logs', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     const logs = await response.json();
//     displayLogs(logs);
//   } catch (error) {
//     console.error('Error fetching logs:', error);
//     alert('Failed to fetch logs. Please try again.');
//   }
// }

// function displayLogs(logs) {
//   const logsList = document.getElementById('logs-list');
//   logsList.innerHTML = logs.map(log => `
//     <li>
//       <strong>${log.type}</strong> at ${new Date(log.timestamp).toLocaleString()}
//       ${log.reason ? `<br><em>Reason: ${log.reason}</em>` : ''}
//     </li>
//   `).join('');
// }

// // Call the function when the page loads
// fetchStudentLogs();

// //