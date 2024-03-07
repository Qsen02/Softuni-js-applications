import { loadHome } from "./home.js";
import { registration } from "./register.js";
import { logingin } from "./login.js";
import { logingout } from "./logout.js";
import { getUserData } from "./utils.js";
const sections = document.querySelectorAll("section");
sections.forEach(el => el.style.display = "none");
const links = document.querySelectorAll("ul li a");
const homeLink = document.querySelector("nav a");
homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    loadHome();
});
const views = {
    welcome: links[0],
    logout: links[1],
    login: links[2],
    register: links[3]
}
views.logout.addEventListener("click", logingout);
views.login.addEventListener("click", logingin);
views.register.addEventListener("click", registration);
export function update() {
    const userData = getUserData();
    if (userData) {
        views.logout.style.display = "inline-block";
        views.login.style.display = "none";
        views.register.style.display = "none";
        views.welcome.style.display = "inline-block";
        views.welcome.textContent = `Welcome, ${userData.email}`;
        loadHome();
    } else {
        views.logout.style.display = "none";
        views.login.style.display = "inline-block";
        views.register.style.display = "inline-block";
        views.welcome.style.display = "none";
        loadHome();
    }
}
update();