import {get, post, put, del } from "./api.js";

const endpoints = {
    catalog: "/data/motorcycles?sortBy=_createdOn%20desc",
    others: "/data/motorcycles"
}

export async function getAllMotorcycles() {
    return await get(endpoints.catalog);
}

export async function createMotorcycle(data) {
    await post(endpoints.others, data);
}

export async function getCurMotorcycle(id) {
    return await get(`${endpoints.others}/${id}`);
}

export async function editMotorcycle(id, data) {
    await put(`${endpoints.others}/${id}`, data);
}

export async function deleteMotorcycle(id) {
    await del(`${endpoints.others}/${id}`);
}