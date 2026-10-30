const complaintStatusList = document.getElementById("complaintStatusList");

const studentId = sessionStorage.getItem("studentId");
const role = sessionStorage.getItem("portalRole");

if (role !== "student" || !studentId) {
    complaintStatusList.textContent = "Please log in as a student.";
} else {
    const complaints = JSON.parse(
        localStorage.getItem("studentFeedback") || "[]"
    );

    // Show only complaints submitted by the logged-in student
    const myComplaints = complaints.filter(function(complaint) {
        return complaint.type === "Complaint" &&
               String(complaint.studentId) === String(studentId);
    });

    complaintStatusList.replaceChildren();

    if (myComplaints.length === 0) {
        complaintStatusList.textContent =
            "You have not submitted any complaints yet.";
    } else {
        myComplaints.forEach(function(complaint) {
            const card = document.createElement("div");
            card.className = "card";

            const heading = document.createElement("h3");
            heading.textContent = complaint.subject;

            const category = document.createElement("p");
            category.textContent = "Category: " + complaint.category;

            const description = document.createElement("p");
            description.textContent = "Description: " + complaint.message;

            const complaintId = document.createElement("p");
            complaintId.textContent = "Complaint ID: " + complaint.feedbackId;

            const date = document.createElement("p");
            date.textContent = "Submitted: " + complaint.submittedAt;

            const status = document.createElement("p");
            status.textContent = "Status: " + complaint.status;

            card.append(
                heading,
                category,
                description,
                complaintId,
                date,
                status
            );

            complaintStatusList.appendChild(card);
        });
    }
}