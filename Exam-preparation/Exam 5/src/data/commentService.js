import {get, post } from "./api.js";

const endpoints = "/data/comments";

export async function getComments(gameId) {
    return await get(`${endpoints}?where=gameId%3D%22${gameId}%22`);
}

export async function postComment(data) {
    await post(endpoints, data);
}