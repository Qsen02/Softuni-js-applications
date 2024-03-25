import {get, post, del, put } from "./api.js";

const endpoints = {
    allMemes: "/data/memes?sortBy=_createdOn%20desc",
    base: "/data/memes",
}

export async function getAllMemes() {
    return await get(endpoints.allMemes);
}

export async function getCurMeme(id) {
    return await get(`${endpoints.base}/${id}`);
}

export async function postMeme(data) {
    await post(endpoints.base, data);
}

export async function deleteMeme(id) {
    await del(`${endpoints.base}/${id}`);
}

export async function editMeme(id, data) {
    await put(`${endpoints.base}/${id}`, data);
}

export async function getUserMemes(userId) {
    return await get(`${endpoints.base}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}