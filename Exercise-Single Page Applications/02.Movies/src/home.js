import { request } from "./requestHandler.js";
import { getUserData } from "./utils.js";
import { loadDetails } from "./details.js";
export function loadHome() {
    const sections = document.querySelectorAll("section");
    sections.forEach(el => el.style.display = "none");
    const homeView = document.getElementById("home-page");
    homeView.style.display = "block";
    start();
}

function start() {
    const url = "http://localhost:3030/data/movies";
    let userData = getUserData();
    const movieBtnSection = document.getElementById("add-movie-button");
    const movieList = document.getElementById("movies-list");
    const movieSection = document.getElementById("movie");
    movieSection.style.display = "block";
    if (userData) {
        movieBtnSection.style.display = "block";
    }
    movieList.style.display = "inline-block";
    showMovies();

    async function showMovies() {
        let data = await request("get", url);
        movieList.replaceChildren(...data.map(el => createContent(el)));
        let detailBtns = document.querySelectorAll("#movies-list li div button");
        detailBtns.forEach(el => el.addEventListener("click", loadDetails));
    }

    function createContent(data) {
        let liEl = document.createElement("li");
        liEl.dataset.ownerid = data._ownerId;
        liEl.className = "card mb-4";
        liEl.innerHTML = ` 
       <img class="card-img-top"  src=${data.img} alt="Card image cap" width="400"/>
       <div class="card-body">
         <h4 class="card-title">${data.title}</h4>
         <a href="#">
         </a>
       </div>
       <div class="card-footer">
       <button data-id=${data._id} type="button" class="btn btn-info">Details</button>
       </div>`;
        return liEl;
    }

}