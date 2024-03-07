import { request } from "./requestHandler.js";
import { getUserData } from "./utils.js";
export function loadDetails(event) {
    const sections = document.querySelectorAll("section");
    sections.forEach(el => el.style.display = "none");
    const id = event.target.dataset.id
    let userData = getUserData();
    if (userData) {
        const homeView = document.getElementById("home-page");
        homeView.style.display = "block";
        start(id);
    }
}

function start(id) {
    const url = "http://localhost:3030/data/movies";
    let curUserData = getUserData();
    currentMovie(id)

    async function currentMovie(id) {
        const sections = document.querySelectorAll("section");
        const curMovieSection = document.getElementById("movie-example");
        sections.forEach(el => el.style.display = "none");
        curMovieSection.style.display = "block";
        let data = await request("get", url + "/" + id);
        curMovieSection.children[0].replaceChildren(createCurContent(data));
        let deleteBtn = document.querySelectorAll("#movie-example div a:nth-child(3)");
        let editBtn = document.querySelectorAll("#movie-example div a:nth-child(4)");
        let likes = document.querySelectorAll("#movie-example span");
        hide(deleteBtn);
        hide(editBtn);
        hide(likes);
    }

    function hide(elements) {
        elements.forEach(el => {
            if (el.dataset.ownerid != curUserData._id) {
                el.style.display = "none";
            }
        })
    }

    function createCurContent(data) {
        let divEl = document.createElement("div");
        divEl.className = "row bg-light text-dark";
        divEl.innerHTML = ` <h1>${data.title}</h1>
        <div class="col-md-8">
          <img
            class="img-thumbnail"
            src=${data.img}
            alt="Movie"
          />
        </div>
        <div class="col-md-4 text-center">
          <h3 class="my-3">Movie Description</h3>
          <p>
           ${data.description}
          </p>
          <a data-id=${data._id} data-ownerid=${data._ownerId} class="btn btn-danger" href="#">Delete</a>
          <a data-id=${data._id} data-ownerid=${data._ownerId} class="btn btn-warning" href="#">Edit</a>
          <a data-id=${data._id} class="btn btn-primary" href="#">Like</a>
          <span data-ownerid=${data._ownerId} class="enrolled-span">Liked 1</span>
        </div>`;
        return divEl;
    }
}