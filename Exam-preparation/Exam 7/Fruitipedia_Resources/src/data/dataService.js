import {get, post, del, put } from "./api.js";

const endpoints = {
    catalog: "/data/fruits?sortBy=_createdOn%20desc",
    base: "/data/fruits"
}

export async function getFruits() {
    return await get(endpoints.catalog);
}

export async function addFruit(data) {
    await post(endpoints.base, data);
}

export async function getFruitById(id) {
    return await get(`${endpoints.base}/${id}`);
}

export async function deleteFruit(id) {
    await del(`${endpoints.base}/${id}`);
}

export async function editFruit(id, data) {
    await put(`${endpoints.base}/${id}`, data);
}

export async function searchFruit(inputValue) {
    return await get(`${endpoints.base}?where=name%20LIKE%20%22${inputValue}%22`);
}