import {get, post, del, put } from "./api.js";

const endpoints = {
    catalog: "/data/cyberpunk?sortBy=_createdOn%20desc",
    base: "/data/cyberpunk"
}

export async function getAllProducts() {
    return await get(endpoints.catalog);
}

export async function getProductById(id) {
    return await get(`${endpoints.base}/${id}`);
}

export async function createProduct(data) {
    await post(endpoints.base, data);
}

export async function deleteProduct(id) {
    await del(`${endpoints.base}/${id}`);
}

export async function editProduct(id, data) {
    await put(`${endpoints.base}/${id}`, data);
}