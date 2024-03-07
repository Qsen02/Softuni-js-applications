import { request } from "./requestHandler.js";
import { addUserData } from "./utils.js";
import { update } from "./app.js";
export function logingin() {
    const sections = document.querySelectorAll("section");
    sections.forEach(el => el.style.display = "none");
    const formRef = document.getElementById("form-login");
    formRef.style.display = "block";
    formRef.addEventListener("submit", onLogin);
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    const url = "http://localhost:3030/users/login";
    let data = await request("post", url, { email, password });
    event.target.reset();
    addUserData(data);
    update();
}