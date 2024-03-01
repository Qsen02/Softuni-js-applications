function attachEvents() {
    const phoneBookRef = document.getElementById("phonebook");
    const loadBtnRef = document.getElementById("btnLoad");
    const presonNameRef = document.getElementById("person");
    const phoneRef = document.getElementById("phone");
    const createBtn = document.getElementById("btnCreate");
    let url = "http://localhost:3030/jsonstore/phonebook";
    loadBtnRef.addEventListener("click", loadData);
    createBtn.addEventListener("click", addData);

    async function loadData() {
        try {
            let res = await fetch(url);
            if (!res.ok) {
                throw new Error;
            }
            let data = await res.json();
            phoneBookRef.replaceChildren(...Object.values(data).map(el => createLiElement(el)));
        } catch (err) {
            alert(err.message);
        }
    }

    function createLiElement(data) {
        let liEl = document.createElement("li");
        liEl.textContent = `${data.person}: ${data.phone}`;
        let deleteBtn = document.createElement("button");
        deleteBtn.dataset.id = data._id;
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteEntry);
        liEl.appendChild(deleteBtn);
        return liEl;
    }

    async function deleteEntry(event) {
        const id = event.target.dataset.id;
        await fetch(`${url}/${id}`, { method: "delete" });
        event.target.parentElement.remove();
    }

    async function addData() {
        let person = presonNameRef.value;
        let phone = phoneRef.value;
        if (!person || !phone) {
            return;
        }
        try {
            let res = await fetch(url, {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ person, phone })
            })
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            presonNameRef.value = "";
            phoneRef.value = "";
        } catch (err) {
            alert(err.message);
        }
    }
}

attachEvents();