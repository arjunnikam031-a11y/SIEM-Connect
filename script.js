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

// Admin Account Settings
const settingsForm = document.getElementById("adminSettingsForm");

if (settingsForm) {
    settingsForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const currentId = document.getElementById("currentAdminId").value.trim();
        const currentPassword = document.getElementById("currentAdminPassword").value;
        const newId = document.getElementById("newAdminId").value.trim();
        const newPassword = document.getElementById("newAdminPassword").value;
        const confirmPassword = document.getElementById("confirmNewAdminPassword").value;
        const message = document.getElementById("message");

        const admins = JSON.parse(localStorage.getItem("registeredAdmins") || "[]");
        const saved = JSON.parse(localStorage.getItem("siemAdminCredentials") || "null");

        const index = admins.findIndex(a =>
            a.id === currentId && a.password === currentPassword
        );

        const validSaved = saved &&
            saved.id === currentId &&
            saved.password === currentPassword;

        const validDefault = !saved &&
            currentId === DEFAULT_ADMIN_ID &&
            currentPassword === DEFAULT_ADMIN_PASSWORD;

        if (index === -1 && !validSaved && !validDefault) {
            message.textContent = "Current ID or password is incorrect.";
            return;
        }

        if (newPassword.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            return;
        }

        if (newPassword !== confirmPassword) {
            message.textContent = "New passwords do not match.";
            return;
        }

        if (admins.some((a, i) => i !== index && a.id === newId)) {
            message.textContent = "This Admin ID is already in use.";
            return;
        }

        if (index !== -1) {
            admins[index].id = newId;
            admins[index].password = newPassword;
            localStorage.setItem("registeredAdmins", JSON.stringify(admins));
        } else {
            localStorage.setItem("siemAdminCredentials", JSON.stringify({
                id: newId,
                password: newPassword
            }));
        }

        message.textContent = "Credentials updated successfully! Please login again.";
        settingsForm.reset();
        sessionStorage.removeItem("portalRole");

        setTimeout(function() {
            window.location.href = "admin-login.html";
        }, 1800);
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
