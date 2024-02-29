window.addEventListener("load", start);

function start() {
    let userData = JSON.parse(sessionStorage.getItem("user"));
    if (!userData) {
        window.location = "/login.html";
        return;
    }
    document.querySelector("form").addEventListener("submit", create);
}

async function create(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let body = {
        name: data.name,
        image: data.img,
        ingredients: parseInArray(data.ingredients),
        steps: parseInArray(data.steps)
    }
    const url = "http://localhost:3030/data/recipes";
    try {
        let userData = JSON.parse(sessionStorage.getItem("user"));
        if (!userData) {
            throw new Error("You must logged in!");
        }
        let res = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const err = res.json();
            throw new Error(err.message);
        }
        window.location = "/index.html";
    } catch (err) {
        alert(err.message);
    }
}

function parseInArray(data) {
    return data.split("\n").map(el => el.trim()).filter(el => el);
}