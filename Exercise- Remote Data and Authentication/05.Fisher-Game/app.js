const userData = JSON.parse(localStorage.getItem("user"));
const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const logOutBtn = document.getElementById("logout");
const catches = document.getElementById("catches");
const loadBtn = document.querySelector(".load");
const user = document.querySelector(".email span");
const addBtn = document.querySelector(".add");
const formRef = document.getElementById("addForm");
logOutBtn.addEventListener("click", onLogOut);
loadBtn.addEventListener("click", loadData);
formRef.addEventListener("submit", addData);
loadData();

if (userData) {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logOutBtn.style.display = "inline-block";
    user.textContent = userData.email;
    addBtn.disabled = false;
    loadBtn.disabled = false;
} else {
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logOutBtn.style.display = "none";
    catches.style.display = "none"
    loadBtn.disabled = true;
    addBtn.disabled = true;
}

async function onLogOut() {
    try {
        const url = "http://localhost:3030/users/logout";
        let res = await fetch(url, {
            method: "get",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": userData.accessToken
            }
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        localStorage.clear();
        window.location = "/index.html";
    } catch (err) {
        alert(err.message);
    }
}

async function loadData() {
    const url = "http://localhost:3030/data/catches";
    try {
        let res = await fetch(url);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        let data = await res.json();
        console.log(data);
        catches.replaceChildren(...data.map(el => createCatches(el)));
        Array.from(catches.children).forEach(el => {
            if (el.children[12].dataset.ownerid != userData._id && el.children[13].dataset.ownerid != userData._id) {
                Array.from(el.children).map((el, i) => {
                    if (i % 2 != 0) {
                        el.disabled = true;
                    }
                })
                el.children[12].disabled = true;
            }
        })
    } catch (err) {
        alert(err.message);
    }
}

async function addData(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let angler = formData.get("angler").trim();
    let weight = formData.get("weight").trim();
    let species = formData.get("species").trim();
    let location = formData.get("location").trim();
    let bait = formData.get("bait").trim();
    let captureTime = formData.get("captureTime").trim();
    const url = "http://localhost:3030/data/catches";
    try {
        let res = await fetch(url, {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
        })
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        formRef.reset();
        await loadData();
    } catch (err) {
        alert(err.message);
    }
}
async function deleteData(event) {
    const id = event.target.dataset.id;
    const url = `http://localhost:3030/data/catches/${id}`;
    try {
        let res = await fetch(url, {
            method: "delete",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": userData.accessToken
            }
        })
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        await loadData();
    } catch (err) {
        alert(err.message)
    }
}
async function editData(event) {
    let angler = event.target.parentElement.children[1].value.trim();
    let weight = event.target.parentElement.children[3].value.trim();
    let species = event.target.parentElement.children[5].value.trim();
    let location = event.target.parentElement.children[7].value.trim();
    let bait = event.target.parentElement.children[9].value.trim();
    let captureTime = event.target.parentElement.children[11].value.trim();
    const id = event.target.dataset.id;
    const ownerid = event.target.dataset.ownerid;
    const url = `http://localhost:3030/data/catches/${id}`;
    try {
        let res = await fetch(url, {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime, id, ownerid })
        })
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        await loadData();
    } catch (err) {
        alert(err.message)
    }
}

function createCatches(data) {
    let divEl = document.createElement("div");
    divEl.classList.add("catch");
    divEl.innerHTML = ` <label>Angler</label>
                        <input type="text" class="angler" value="${data.angler}">
                        <label>Weight</label>
                        <input type="text" class="weight" value="${data.weight}">
                        <label>Species</label>
                        <input type="text" class="species" value="${data.species}">
                        <label>Location</label>
                        <input type="text" class="location" value="${data.location}">
                        <label>Bait</label>
                        <input type="text" class="bait" value="${data.bait}">
                        <label>Capture Time</label>
                        <input type="number" class="captureTime" value="${data.captureTime}">
                        <button class="update" data-ownerid="${data._ownerId}" data-id="${data._id}">Update</button>
                        <button class="delete" data-ownerid="${data._ownerId}" data-id="${data._id}">Delete</button>`
    divEl.children[12].addEventListener("click", editData);
    divEl.children[13].addEventListener("click", deleteData);
    return divEl;
}