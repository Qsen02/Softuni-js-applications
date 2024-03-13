import { getUserData, deleteUserData } from "./data/utils.js";
import { loadHome } from "./home.js";
import { loadRegister } from "./register.js";
import { loadLogin } from "./login.js";
import { loadDashboard } from "./dashboard.js";
import { createIdea } from "./create.js";
import { loadDetails } from "./details.js";
import {get } from "./data/requester.js";
import { page } from "./nav.js";
let userData = getUserData();
let links = document.querySelectorAll("nav a");
let linksArray = Array.from(links);
if (userData) {
    linksArray[0].style.display = "inline-block";
    linksArray[1].style.display = "inline-block";
    linksArray[2].style.display = "inline-block";
    linksArray[3].style.display = "inline-block";
    linksArray[4].style.display = "none";
    linksArray[5].style.display = "none";
} else {
    linksArray[0].style.display = "inline-block";
    linksArray[1].style.display = "inline-block";
    linksArray[2].style.display = "none";
    linksArray[3].style.display = "none";
    linksArray[4].style.display = "inline-block";
    linksArray[5].style.display = "inline-block";
}

page("/", loadHome);
page("/home", loadHome);
page("/dashboard", loadDashboard);
page("/dashboard/:id", loadDetails)
page("/login", loadLogin);
page("/register", loadRegister);
page("/create", createIdea);
page("/logout", onLogout);
page();
async function onLogout() {
    const url = "http://localhost:3030/users/logout";
    await get(url);
    deleteUserData();
    page.redirect("/");
}