const statusList = document.getElementById("applicationStatusList");

const loggedInStudentId = sessionStorage.getItem("studentId");

const applications = JSON.parse(
    localStorage.getItem("bonafideApplications") || "[]"
);

const myApplications = applications.filter(function(app) {
    return String(app.prn) === loggedInStudentId;
});

if (myApplications.length === 0) {
    statusList.textContent = "No bonafide applications found for your PRN.";
} else {
    myApplications.forEach(function(app) {
        const card = document.createElement("div");
        card.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = "Application ID: " + app.applicationId;

        const purpose = document.createElement("p");
        purpose.textContent = "Purpose: " + app.purpose;

        const date = document.createElement("p");
        date.textContent = "Submitted: " + app.submittedAt;

        const status = document.createElement("p");
        status.textContent = "Status: " + app.status;

        card.append(heading, purpose, date, status);
        statusList.appendChild(card);
    });
}