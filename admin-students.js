const studentList = document.getElementById("studentList");
const studentCount = document.getElementById("studentCount");
const searchStudent = document.getElementById("searchStudent");

function displayStudents() {
    const students = JSON.parse(
        localStorage.getItem("registeredStudents") || "[]"
    );

    const search = searchStudent.value.trim().toLowerCase();

    const filteredStudents = students.filter(function(student) {
        return (
            student.name.toLowerCase().includes(search) ||
            String(student.roll).includes(search) ||
            String(student.prn).toLowerCase().includes(search)
        );
    });

    studentList.replaceChildren();

    studentCount.textContent =
        "Registered Students: " + students.length + " / 43";

    if (filteredStudents.length === 0) {
        studentList.textContent = "No students found.";
        return;
    }

    filteredStudents.forEach(function(student) {
        const card = document.createElement("div");
        card.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = student.name;

        const roll = document.createElement("p");
        roll.textContent = "Roll Number: " + student.roll;

        const prn = document.createElement("p");
        prn.textContent = "PRN: " + student.prn;

        const mobile = document.createElement("p");
        mobile.textContent = "Mobile: " +
            (localStorage.getItem(student.studentId + "_mobile") ||
             student.mobile);

        card.append(heading, roll, prn, mobile);
        const editButton = document.createElement("button");
editButton.textContent = "Edit Student";
editButton.addEventListener("click", function () {
    const newName = prompt("Enter Student Name:", student.name);
    if (newName === null) return;

    const newRoll = prompt("Enter Roll Number:", student.roll);
    if (newRoll === null) return;

    const newPRN = prompt("Enter PRN Number:", student.prn);
    if (newPRN === null) return;

    const currentMobile =
        localStorage.getItem(student.studentId + "_mobile") ||
        student.mobile || "";

    const newMobile = prompt("Enter Mobile Number:", currentMobile);
    if (newMobile === null) return;

    const name = newName.trim();
    const roll = newRoll.trim();
    const prn = newPRN.trim();
    const mobile = newMobile.trim();

    if (!name || !roll || !prn || !/^\d{10}$/.test(mobile)) {
        alert("Enter valid details and a 10-digit mobile number.");
        return;
    }

    const students = JSON.parse(
        localStorage.getItem("registeredStudents") || "[]"
    );

    const duplicate = students.some(function(item) {
        return item.studentId !== student.studentId &&
            (String(item.prn) === prn || String(item.roll) === roll);
    });

    if (duplicate) {
        alert("This PRN or Roll Number is already registered.");
        return;
    }

    const record = students.find(function(item) {
        return item.studentId === student.studentId;
    });

    if (!record) return;

    const oldId = record.studentId;
    const newId = oldId === String(record.prn) ? prn : oldId;

    record.name = name;
    record.roll = roll;
    record.prn = prn;
    record.mobile = mobile;
    record.studentId = newId;

    localStorage.setItem(
        "registeredStudents",
        JSON.stringify(students)
    );

    localStorage.removeItem(oldId + "_mobile");
    localStorage.setItem(newId + "_mobile", mobile);

    alert("Student details updated successfully!");
    displayStudents();
});

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete Student";
deleteButton.addEventListener("click", function () {
    const confirmDelete = confirm(
        "Are you sure you want to delete " + student.name + "?"
    );

    if (!confirmDelete) return;

    const students = JSON.parse(
        localStorage.getItem("registeredStudents") || "[]"
    );

    const updatedStudents = students.filter(function(item) {
        return item.studentId !== student.studentId;
    });

    localStorage.setItem(
        "registeredStudents",
        JSON.stringify(updatedStudents)
    );

    localStorage.removeItem(student.studentId + "_mobile");

    alert("Student account deleted successfully!");
    displayStudents();
});

card.append(editButton, deleteButton);
        studentList.appendChild(card);
    });
}

searchStudent.addEventListener("input", displayStudents);
displayStudents();