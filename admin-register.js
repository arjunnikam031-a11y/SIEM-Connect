const adminForm = document.getElementById("adminRegisterForm");
const message = document.getElementById("adminRegisterMessage");

adminForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("adminName").value.trim();
    const id = document.getElementById("adminId").value.trim();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    const confirmPassword = document.getElementById("confirmAdminPassword").value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        return;
    }

    const admins = JSON.parse(
        localStorage.getItem("registeredAdmins") || "[]"
    );

    const alreadyExists = admins.some(function(admin) {
        return admin.id === id || admin.email === email;
    });

    if (alreadyExists) {
        message.textContent = "Admin ID or email already registered!";
        return;
    }

    admins.push({
        name: name,
        id: id,
        email: email,
        password: password
    });

    localStorage.setItem(
        "registeredAdmins",
        JSON.stringify(admins)
    );

    message.textContent =
        "Admin account created! Your Admin ID is " + id;

    adminForm.reset();
});