const logOutBtn = document.getElementById("logout");
logOutBtn.style.display = "none";
const url = "http://localhost:3030/users/login";
const formRef = document.querySelector("#login-view form");
formRef.addEventListener("submit", onLogin);
async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();

    try {
        let res = await fetch(url, {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        let userData = await res.json();
        localStorage.setItem("user", JSON.stringify(userData));
        window.location = "/index.html";
    } catch (err) {
        alert(err.message);
    }
}