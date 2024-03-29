import {get, post, del, put } from "./api.js";

const endpoints = {
    catalog: "/data/products?sortBy=_createdOn%20desc",
    base: "/data/products",
    bought: "/data/bought"
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

export async function bought(data) {
    await post(endpoints.bought, data);
}

export async function getSalesForProduct(productId) {
    return await get(`${endpoints.bought}?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
}

export async function getUserSale(productId, userId) {
    return await get(`${endpoints.bought}?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}