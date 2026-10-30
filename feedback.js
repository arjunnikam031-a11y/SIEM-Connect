const feedbackForm = document.getElementById("feedbackForm");
const feedbackResult = document.getElementById("feedbackResult");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const studentId = sessionStorage.getItem("studentId");

        if (!studentId ||
            sessionStorage.getItem("portalRole") !== "student") {
            feedbackResult.textContent =
                "Please log in as a student first.";
            return;
        }

        const feedback = {
            feedbackId: "FB" + Date.now(),
            studentId: studentId,
            type: document.getElementById("feedbackType").value,
            category: document.getElementById("feedbackCategory").value,
            subject: document.getElementById("feedbackSubject").value.trim(),
            message: document.getElementById("feedbackMessage").value.trim(),
            status: "Pending",
            submittedAt: new Date().toLocaleString()
        };

        const feedbackList = JSON.parse(
            localStorage.getItem("studentFeedback") || "[]"
        );

        feedbackList.push(feedback);

        localStorage.setItem(
            "studentFeedback",
            JSON.stringify(feedbackList)
        );

        feedbackResult.textContent =
            "complaint submitted successfully! Reference ID: " +
            feedback.feedbackId;

        feedbackForm.reset();
    });
}