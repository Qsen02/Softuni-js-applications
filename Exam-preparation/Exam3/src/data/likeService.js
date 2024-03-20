import {get, post } from "./api.js";

const endpoint = "/data/likes";

export async function liking(data) {
    await post(endpoint, data);
}

export async function likeForCurFact(id) {
    return await get(`${endpoint}?where=factId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function likeForUser(factId, userId) {
    return await get(`${endpoint}?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}