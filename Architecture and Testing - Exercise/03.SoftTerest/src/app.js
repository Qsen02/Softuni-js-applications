import { getUserData, deleteUserData } from "./data/utils.js";
import { loadHome } from "./home.js";
import { loadRegister } from "./register.js";
import { loadLogin } from "./login.js";
import { request } from "./data/requester.js";
import { loadDashboard } from "./dashboard.js";
import { createIdea } from "./create.js";
let userData = getUserData();
const navRef = document.querySelector("nav");
let links = document.querySelectorAll("nav a");
let linksArray = Array.from(links);
navRef.addEventListener("click", navigate);
loadHome();

let routes = {
    "/": loadHome,
    "/home": loadHome,
    "/login": loadLogin,
    "/create": createIdea,
    "/register": loadRegister,
    "/logout": onLogout,
    "/dashboard": loadDashboard,
}

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

function navigate(event) {
    event.preventDefault();
    let element = event.target
    if (event.target.tagName != "IMG" && event.target.tagName != "A") {
        return;
    }
    if (event.target.tagName == "IMG") {
        element = event.target.parentElement;
    }
    let view = new URL(element.href).pathname;
    routes[view]();
}

async function onLogout() {
    const url = "http://localhost:3030/users/logout";
    await request("get", url);
    deleteUserData();
    window.location = "/";
}