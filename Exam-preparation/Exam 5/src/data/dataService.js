import {get, post, put, del } from "./api.js";

const endpoints = {
    catalog: "/data/games?sortBy=_createdOn%20desc",
    recentGames: "/data/games?sortBy=_createdOn%20desc&distinct=category",
    base: "/data/games"
}

export async function getAllGames() {
    return await get(endpoints.catalog);
}
export async function getRecentGames() {
    return await get(endpoints.recentGames);
}

export async function createGame(data) {
    await post(endpoints.base, data);
}
export async function getGamesById(id) {
    return await get(`${endpoints.base}/${id}`);
}
export async function deleteGame(id) {
    await del(`${endpoints.base}/${id}`);
}
export async function editGame(id, data) {
    await put(`${endpoints.base}/${id}`, data);
}