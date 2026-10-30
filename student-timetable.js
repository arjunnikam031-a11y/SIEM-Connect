/* Student Timetable - View Only */

function displayStudentTimetable() {

    const tableBody = document.getElementById(
        "studentTimetableBody"
    );

    if (!tableBody) return;

    const timetable = JSON.parse(
        localStorage.getItem("collegeTimetable") || "[]"
    );

    tableBody.replaceChildren();

    timetable.forEach(function(entry) {

        const row = document.createElement("tr");

        const dayCell = document.createElement("td");
        dayCell.textContent = entry.day;
        row.appendChild(dayCell);

        entry.subjects.forEach(function(subject) {

            const cell = document.createElement("td");
            cell.textContent = subject;

            row.appendChild(cell);

        });

        tableBody.appendChild(row);

    });
}

displayStudentTimetable();