const complaintsList = document.getElementById("complaintsList");

function displayComplaints() {
    const complaints = JSON.parse(
        localStorage.getItem("studentFeedback") || "[]"
    ).filter(function(item) {
        return item.type === "Complaint";
    });

    complaintsList.innerHTML = "";

    if (complaints.length === 0) {
        complaintsList.textContent = "No student complaints found.";
        return;
    }

    complaints.forEach(function(complaint) {
        const card = document.createElement("div");
        card.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = complaint.subject;

        const details = document.createElement("p");
        details.textContent =
            "Student ID: " + complaint.studentId +
            " | Category: " + complaint.category;

        const description = document.createElement("p");
        description.textContent = complaint.message;

        const reference = document.createElement("p");
        reference.textContent =
            "Complaint ID: " + complaint.feedbackId;

        const date = document.createElement("p");
        date.textContent =
            "Submitted: " + complaint.submittedAt;

        const statusLabel = document.createElement("p");
        statusLabel.textContent = "Status: " + complaint.status;

        const statusSelect = document.createElement("select");

        ["Pending", "In Progress", "Resolved"].forEach(function(status) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });

        statusSelect.value = complaint.status;

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update Status";

        updateButton.addEventListener("click", function() {
            if (sessionStorage.getItem("portalRole") !== "admin") {
                alert("Admin login required.");
                return;
            }

            const allComplaints = JSON.parse(
                localStorage.getItem("studentFeedback") || "[]"
            );

            const index = allComplaints.findIndex(function(item) {
                return item.feedbackId === complaint.feedbackId;
            });

            if (index !== -1) {
                allComplaints[index].status = statusSelect.value;

                localStorage.setItem(
                    "studentFeedback",
                    JSON.stringify(allComplaints)
                );

                alert("Complaint status updated successfully!");
                displayComplaints();
            }
        });

        card.append(
            heading,
            details,
            description,
            reference,
            date,
            statusLabel,
            statusSelect,
            updateButton
        );

        complaintsList.appendChild(card);
    });
}

if (sessionStorage.getItem("portalRole") === "admin") {
    displayComplaints();
} else {
    complaintsList.textContent = "Admin login required.";
}