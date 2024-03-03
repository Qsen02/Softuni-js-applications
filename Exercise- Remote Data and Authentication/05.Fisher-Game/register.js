const url = "http://localhost:3030/users/register";
const formRef = document.querySelector("#register-view form");
const logOutBtn = document.getElementById("logout");
logOutBtn.style.display = "none";
formRef.addEventListener("submit", onRegister);
async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    let rePass = formData.get("rePass").trim();

    try {
        if (!email || !password || !rePass) {
            throw new Error("All fields are required!");
        }
        if (password != rePass) {
            throw new Error("Password must match!");
        }
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