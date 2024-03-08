import { request } from "./requestHandler.js";
import { getUserData } from "./utils.js";
import { createCurContent } from "./details.js";
export function loadEditForm(event) {
    const id = event.target.dataset.id;
    const ownerid = event.target.dataset.ownerid;
    const sections = document.querySelectorAll("section");
    sections.forEach(el => el.style.display = "none");
    let userData = getUserData();
    if (userData) {
        const homeView = document.getElementById("edit-movie");
        homeView.style.display = "block";
        start(id, ownerid);
    }
}

function start(id, ownerid) {
    const formRef = document.querySelector("#edit-movie form");
    const url = "http://localhost:3030/data/movies";
    formRef.addEventListener("submit", editMovie);
    let curUserData = getUserData();

    async function editMovie(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let title = formData.get("title");
        let description = formData.get("description");
        let img = formData.get("img");
        if (!title || !description || !img) {
            alert("All fields required!");
            return;
        }
        await request("put", url + "/" + id, { title, description, img, _id: id, _ownerId: ownerid });
        formRef.reset();
        await redirect(id);
    }
    async function redirect(id) {
        const sections = document.querySelectorAll("section");
        const curMovieSection = document.getElementById("movie-example");
        sections.forEach(el => el.style.display = "none");
        curMovieSection.style.display = "block";
        let data = await request("get", url + "/" + id);
        curMovieSection.children[0].replaceChildren(createCurContent(data));
        let deleteBtn = document.querySelectorAll("#movie-example div a:nth-child(3)");
        let editBtn = document.querySelectorAll("#movie-example div a:nth-child(4)");
        let likes = document.querySelectorAll("#movie-example span");
        editBtn.forEach(el => el.addEventListener("click", loadEditForm));
        hide(deleteBtn);
        hide(editBtn);
        hide(likes);
    }

    function hide(elements) {
        elements.forEach(el => {
            if (curUserData) {
                if (el.dataset.ownerid != curUserData._id) {
                    el.style.display = "none";
                }
            } else {
                el.style.display = "none";
            }
        })
    }
}