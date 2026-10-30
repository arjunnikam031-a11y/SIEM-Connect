/* Admin Timetable Management */

const timetableKey = "collegeTimetable";

const defaultTimetable = [
    {
        day: "Monday",
        subjects: ["Java", "SET", "FDS", "Practical"]
    },
    {
        day: "Tuesday",
        subjects: ["SET", "Java", "FAI", "Practical"]
    },
    {
        day: "Wednesday",
        subjects: ["FDS", "FAI", "Java", "Library"]
    },
    {
        day: "Thursday",
        subjects: ["Java", "FDS", "SET", "Practical"]
    },
    {
        day: "Friday",
        subjects: ["FAI", "SET", "FDS", "Library"]
    },
    {
        day: "Saturday",
        subjects: ["Practical", "Practical", "Revision", "Activities"]
    }
];

/* Save default timetable only once */

if (localStorage.getItem(timetableKey) === null) {
    localStorage.setItem(
        timetableKey,
        JSON.stringify(defaultTimetable)
    );
}

/* Display Admin Timetable */

function displayAdminTimetable() {
    if (sessionStorage.getItem("portalRole") !== "admin") {
        return;
    }

    const timetable = JSON.parse(
        localStorage.getItem(timetableKey) || "[]"
    );

    const tableBody = document.getElementById("adminTimetableBody");

    if (!tableBody) return;

    tableBody.replaceChildren();

    timetable.forEach(function(entry) {
        const row = document.createElement("tr");

        const dayCell = document.createElement("td");
        dayCell.textContent = entry.day;
        row.appendChild(dayCell);

        entry.subjects.forEach(function(subject, index) {
            const cell = document.createElement("td");

            const subjectText = document.createElement("span");
            subjectText.textContent = subject + " ";
            cell.appendChild(subjectText);

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.textContent = "✏️ Edit";
            editButton.style.margin = "5px";
            editButton.style.padding = "5px 10px";

            editButton.onclick = function() {
                editTimetable(entry.day, index);
            };

            cell.appendChild(editButton);
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

function editTimetable(day, periodIndex) {

    if (sessionStorage.getItem("portalRole") !== "admin") {
        return;
    }

    const timetable = JSON.parse(
        localStorage.getItem(timetableKey) || "[]"
    );

    const entry = timetable.find(function(item) {
        return item.day === day;
    });

    if (!entry) return;

    const oldSubject = entry.subjects[periodIndex];

    const newSubject = prompt(
        "Enter new subject for " + day +
        " - Period " + (periodIndex + 1),
        oldSubject
    );

    if (newSubject === null || newSubject.trim() === "") {
        return;
    }

    entry.subjects[periodIndex] = newSubject.trim();

    localStorage.setItem(
        timetableKey,
        JSON.stringify(timetable)
    );

    displayAdminTimetable();

    alert("Timetable updated successfully!");
}

/* Load Admin Timetable */

if (sessionStorage.getItem("portalRole") === "admin") {
    displayAdminTimetable();
}