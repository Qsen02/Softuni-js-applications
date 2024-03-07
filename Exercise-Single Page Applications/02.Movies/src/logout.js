import { request } from "./requestHandler.js";
import { removeUserData } from "./utils.js";
import { update } from "./app.js";
export function logingout() {
    onLogout();
}

async function onLogout() {
    const url = "http://localhost:3030/users/logout";
    await request("get", url);
    removeUserData();
    update();
    const sections = document.querySelectorAll("section");
    sections.forEach(el => el.style.display = "none");
    const formReference = document.getElementById("form-login");
    formReference.style.display = "block";
}