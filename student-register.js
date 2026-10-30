const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();
    const prn = document.getElementById("studentPRN").value.trim();
    const mobile = document.getElementById("studentMobile").value.trim();
    const password = document.getElementById("studentPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match!";
        return;
    }

    const students = JSON.parse(
        localStorage.getItem("registeredStudents") || "[]"
    );

    const alreadyRegistered = students.some(function (student) {
        return student.roll === roll || student.prn === prn;
    });

    if (alreadyRegistered) {
        registerMessage.textContent =
            "This Roll Number or PRN is already registered!";
        return;
    }

    const newStudent = {
        name: name,
        roll: roll,
        prn: prn,
        mobile: mobile,
        password: password,
        studentId:prn
    };

    students.push(newStudent);

    localStorage.setItem(
        "registeredStudents",
        JSON.stringify(students)
    );

    registerMessage.textContent =
        "Account created successfully! Your Student ID is " +
        newStudent.studentId;

    registerForm.reset();
});