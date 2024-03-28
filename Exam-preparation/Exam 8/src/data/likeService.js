import {get, post } from "./api.js";

const endpoint = "/data/going";

export async function liking(data) {
    await post(endpoint, data);
}

export async function getLikesForEvent(eventId) {
    return await get(`${endpoint}?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`);
}

export async function getCurUserLikes(userId, eventId) {
    return await get(`${endpoint}?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}