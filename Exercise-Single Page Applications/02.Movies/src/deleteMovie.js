import { request } from "./requestHandler.js";
import { getUserData } from "./utils.js";
import { loadHome } from "./home.js";
export function onDelete(event) {
    const id = event.target.dataset.id;
    let userData = getUserData();
    if (userData) {
        deleting(id);
    }
}

async function deleting(id) {
    const url = "http://localhost:3030/data/movies";
    await request("delete", url + "/" + id);
    loadHome();
}