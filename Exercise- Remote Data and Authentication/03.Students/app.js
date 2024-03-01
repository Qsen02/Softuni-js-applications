let formRef = document.getElementById("form");
formRef.addEventListener("submit", addStudent);
const tableRef = document.querySelector("#results tbody");
const url = "http://localhost:3030/jsonstore/collections/students";
createTable();

async function addStudent(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let firstName = formData.get("firstName").trim();
    let lastName = formData.get("lastName").trim();
    let facultyNumber = formData.get("facultyNumber").trim();
    let grade = formData.get("grade").trim();
    if (!firstName || !lastName || !facultyNumber || !grade) {
        return;
    }
    await fetch(url, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
    })
    formRef.reset();
    tableRef.innerHTML = "";
    await createTable();
}

async function createTable() {
    let res = await fetch(url)
    let data = await res.json();
    let dataValues = Object.values(data);
    for (let data of dataValues) {
        let newElement = createElements(data);
        tableRef.appendChild(newElement);
    }

}

function createElements(data) {
    let trEl = document.createElement("tr");
    let firstNameEl = document.createElement("td");
    firstNameEl.textContent = data.firstName;
    trEl.appendChild(firstNameEl);
    let lastNameEl = document.createElement("td");
    lastNameEl.textContent = data.lastName;
    trEl.appendChild(lastNameEl);
    let facultyNumberEl = document.createElement("td");
    facultyNumberEl.textContent = data.facultyNumber;
    trEl.appendChild(facultyNumberEl);
    let gradeEl = document.createElement("td");
    gradeEl.textContent = data.grade;
    trEl.appendChild(gradeEl);
    return trEl;
}