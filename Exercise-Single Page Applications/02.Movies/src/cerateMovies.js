import { request } from "./requestHandler.js";
import { getUserData } from "./utils.js";
import { loadHome } from "./home.js";
export function loadCreateForm() {
    const sections = document.querySelectorAll("section");
    sections.forEach(el => el.style.display = "none");
    let userData = getUserData();
    if (userData) {
        const homeView = document.getElementById("add-movie");
        homeView.style.display = "block";
        start();
    }
}

function start() {
    const formRef = document.querySelector("#add-movie form");
    formRef.addEventListener("submit", addMovie);
    const url = "http://localhost:3030/data/movies";
    async function addMovie(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let title = formData.get("title");
        let description = formData.get("description");
        let img = formData.get("img");
        if (!title || !description || !img) {
            alert("All fields required!");
            return;
        }
        await request("post", url, { title, description, img });
        formRef.reset();
        loadHome();
    }
}