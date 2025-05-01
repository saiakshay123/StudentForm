const form = document.querySelector("form");
const studentname = document.getElementById("name");
const studentid = document.getElementById("number-input");
const studentemail = document.getElementById("email");
const studentno = document.getElementById("phone");
const studentclass = document.getElementById("class");
const studentaddress = document.getElementById("address");
const outputtable = document.getElementById("student-list");

// Load stored students on page load
window.onload = function () {
    const storedData = JSON.parse(localStorage.getItem("students")) || [];
    storedData.forEach(student => addStudentToTable(student));
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = studentname.value.trim();
    const id = studentid.value.trim();
    const email = studentemail.value.trim();
    const phone = studentno.value.trim();
    const className = studentclass.value.trim();
    const address = studentaddress.value.trim();

    if (!validateInputs(name, id, email, phone, className, address)) return;

    const student = { name, id, email, phone, className, address };
    addStudentToTable(student);
    saveToLocalStorage(student);

    form.reset();
});

function validateInputs(name, id, email, phone, className, address) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !id || !email || !phone || !className || !address) {
        alert("Please fill in all fields.");
        return false;
    }

    if (!nameRegex.test(name)) {
        alert("Name must contain only letters and spaces.");
        return false;
    }

    if (isNaN(id) || isNaN(phone)) {
        alert("Student ID and Contact Number must be numeric.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email address.");
        return false;
    }

    return true;
}

function addStudentToTable(student) {
    const newrow = document.createElement("tr");

    newrow.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.className}</td>
        <td>${student.address}</td>
        <td>
            <button type="button" onclick="editdata(this)">Edit</button>
            <button type="button" onclick="deletedata(this)">Delete</button>
        </td>
    `;

    outputtable.appendChild(newrow);
}

function saveToLocalStorage(student) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

function updateLocalStorage() {
    const rows = document.querySelectorAll("#student-list tr");
    const students = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        students.push({
            name: cells[0].textContent,
            id: cells[1].textContent,
            email: cells[2].textContent,
            phone: cells[3].textContent,
            className: cells[4].textContent,
            address: cells[5].textContent
        });
    });

    localStorage.setItem("students", JSON.stringify(students));
}

function editdata(button) {
    const row = button.closest("tr");
    const cells = row.getElementsByTagName("td");

    const newname = prompt("Enter new name", cells[0].textContent);
    const newid = prompt("Enter new ID", cells[1].textContent);
    const newemail = prompt("Enter new email", cells[2].textContent);
    const newphone = prompt("Enter new contact number", cells[3].textContent);
    const newclass = prompt("Enter new class", cells[4].textContent);
    const newaddress = prompt("Enter new address", cells[5].textContent);

    if (newname && newid && newemail && newphone && newclass && newaddress) {
        if (validateInputs(newname, newid, newemail, newphone, newclass, newaddress)) {
            cells[0].textContent = newname;
            cells[1].textContent = newid;
            cells[2].textContent = newemail;
            cells[3].textContent = newphone;
            cells[4].textContent = newclass;
            cells[5].textContent = newaddress;
            updateLocalStorage();
        }
    }
}

function deletedata(button) {
    const row = button.closest("tr");
    row.remove();
    updateLocalStorage();
}
