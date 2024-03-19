import {get, post } from "./api.js";
const baseUrl = "http://localhost:3030";
let endpoint = "/data/likes";

export async function getLikesForMovie(id) {
    return await get(`${baseUrl}${endpoint}?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getLikesForUser(movieId, userId) {
    return await get(`${baseUrl}${endpoint}?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
}

export async function liking(data) {
    await post(`${baseUrl}${endpoint}`, data);
}