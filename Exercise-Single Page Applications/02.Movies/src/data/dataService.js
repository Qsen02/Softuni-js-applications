import {get, post, del, put } from "./api.js";

const baseUrl = "http://localhost:3030";
let endpoint = "/data/movies";

export async function getMovies() {
    return await get(`${baseUrl}${endpoint}`);
}

export async function getDetails(id) {
    return await get(`${baseUrl}${endpoint}/${id}`);
}

export async function createMovie(data) {
    await post(`${baseUrl}${endpoint}`, data);
}

export async function editMovie(id, data) {
    await put(`${baseUrl}${endpoint}/${id}`, data);
}

export async function deleteMovie(id) {
    await del(`${baseUrl}${endpoint}/${id}`);
}