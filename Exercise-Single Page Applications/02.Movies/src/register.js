import { request } from "./requestHandler.js";
import { addUserData } from "./utils.js";
import { update } from "./app.js";
export function registration() {
    const sections = document.querySelectorAll("section");
    sections.forEach(el => el.style.display = "none");
    const formRef = document.getElementById("form-sign-up")
    formRef.style.display = "block";
    formRef.addEventListener("submit", onRegister);
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let repeatPassword = formData.get("repeatPassword");
    const url = "http://localhost:3030/users/register";
    if (!email || !password || !repeatPassword) {
        alert("All fields required!");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 symbols!");
        return;
    }
    if (password != repeatPassword) {
        alert("Password must match!");
        return;
    }
    let data = await request("post", url, { email, password });
    event.target.reset();
    addUserData(data);
    update();
}