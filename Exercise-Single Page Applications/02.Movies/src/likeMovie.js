import { request } from "./requestHandler.js";
import { getUserData } from "./utils.js";
export function onLike(event) {
    const id = event.target.dataset.id;
    let userData = getUserData();
    if (userData) {
        liking(id);
    }
    event.target.style.display = "none";
    let likes = event.target.parentElement.children[5];
    likes.style.display = "inline-block";
}

async function liking(id) {
    const url = "http://localhost:3030/data/likes";
    let movieId = id;
    await request("post", url, { movieId });
}