import {get, post, del, put } from "./api.js";

const endpoints = {
    catalog: "/data/events?sortBy=_createdOn%20desc",
    base: "/data/events"
}

export async function getAllEvents() {
    return await get(endpoints.catalog);
}

export async function getEventById(id) {
    return await get(`${endpoints.base}/${id}`);
}

export async function createEvent(data) {
    await post(endpoints.base, data);
}

export async function deleteEvent(id) {
    await del(`${endpoints.base}/${id}`);
}

export async function editEvent(id, data) {
    await put(`${endpoints.base}/${id}`, data);
}