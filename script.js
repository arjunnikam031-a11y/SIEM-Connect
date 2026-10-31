function showMessage(text) {
    const message = document.getElementById("message");
    if (message) {
        message.textContent = text;
    }
}

// Demo student login
const studentForm = document.getElementById("studentForm");

if (studentForm) {
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("studentId").value.trim();
        const password = document.getElementById("password").value;

       const students = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
const registeredStudent = students.find(function(student) {
    return student.studentId === id && student.password === password;
});

if ((id === "student1" && password === "student123") || registeredStudent) {
            sessionStorage.setItem("portalRole", "student");
            sessionStorage.setItem("studentId", id);

            window.location.href = "student-dashboard.html";
        } else {
            showMessage("Invalid Student ID or password.");
        }
    });
}
// Demo admin login
const adminForm = document.getElementById("adminForm");

if (adminForm) {
    adminForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("adminId").value;
        const password =
            document.getElementById("adminPassword").value;

        const admins = JSON.parse(
    localStorage.getItem("registeredAdmins") || "[]"
);

const registeredAdmin = admins.find(function(admin) {
    return admin.id === id && admin.password === password;
});

const DEFAULT_ADMIN_ID = "451202425";
const DEFAULT_ADMIN_PASSWORD = "arjunkaran";

if ((id === DEFAULT_ADMIN_ID &&
     password === DEFAULT_ADMIN_PASSWORD) || registeredAdmin) {
            sessionStorage.setItem("portalRole", "admin");
            window.location.href = "admin-dashboard.html";
        } else {
            showMessage("Invalid Admin ID or password.");
        }
    });
}

// Demo dashboard access check
const requiredRole = document.body.dataset.role;

if (requiredRole &&
    sessionStorage.getItem("portalRole") !== requiredRole) {
    window.location.replace(
        requiredRole === "admin"
            ? "admin-login.html"
            : "student-login.html"
    );
}

// Logout
function logout() {
    sessionStorage.removeItem("portalRole");
    window.location.href = "index.html";
}
