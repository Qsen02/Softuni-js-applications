import {get } from "./api.js";

const endpoint = "/data/motorcycles";

export async function searching(userInput) {
    return await get(`${endpoint}?where=model%20LIKE%20%22${userInput}%22`);
}