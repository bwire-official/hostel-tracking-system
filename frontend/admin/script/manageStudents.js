const hamburger = document.querySelector(".toggle-btn");


const toggler = document.querySelector("#iconic");

hamburger.addEventListener("click", function(){
    document.querySelector(".sidebar").classList.toggle("expand")
    toggler.classList.toggle("bx-chevrons-right")
    toggler.classList.toggle("bx-chevrons-left")
})


//Simulated student data for the demo, this will be changed.

const students = [
    {}
]; //The actual data should be added by the backend.

document.getElementById("searchBtn").addEventListener("click", function () {
    let searchValue = document.getElementById("studentSearch").value.trim().toLowerCase();
    let studentInfo = document.getElementById("studentInfo");
    let foundStudent = students.find(student => 
        student.id.toLowerCase() === searchValue || student.name.toLowerCase() === searchValue
    );

    if (foundStudent) {
        // Fill in the student details
        document.getElementById("studentNameDisplay").textContent = foundStudent.name;
        document.getElementById("studentIdDisplay").textContent = foundStudent.id;
        document.getElementById("studentRoomDisplay").textContent = foundStudent.room;
        document.getElementById("studentContactDisplay").textContent = foundStudent.contact;
        

        // Show the student card
        studentInfo.classList.remove("d-none");
    } else {
        // Show message if student is not found
        studentInfo.classList.add("d-none");
        alert("Student not found!");
    }
});
// Clear Search Button Functionality
document.getElementById("clearSearchBtn").addEventListener("click", function () {
    document.getElementById("studentSearch").value = ""; // Clear input field
    document.getElementById("studentInfo").classList.add("d-none"); // Hide student card
});

// Add new student, might be changed during the backend.

document.getElementById("addStudentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("studentName").value.trim();
    let id = document.getElementById("studentId").value.trim();
    let room = document.getElementById("studentRoom").value.trim();
    let contact = document.getElementById("studentContact").value.trim();

    if (id.length !== 10 || isNaN(id)) {
        alert("Student ID must be exactly 10 digits!");
        return;
    }

    if (name && id && room && contact) {
        let newStudent = {
            name: name,
            id: id,
            room: room,
            contact: contact
        };

        students.push(newStudent); // Assuming `students` is the list of all students
        alert("Student Added Successfully!");

        document.getElementById("addStudentForm").reset(); // Clear form

        let modal = new bootstrap.Modal(document.getElementById("addStudentModal"));
        modal.hide(); // Close modal after submission
    } else {
        alert("Please fill out all fields!");
    }
});
