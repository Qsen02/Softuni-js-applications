import {get, post, put, del } from "./api.js";

const endpoints = {
    catalog: "/data/facts?sortBy=_createdOn%20desc",
    all: "/data/facts"
}

export async function getAllFacts() {
    return await get(endpoints.catalog);
}

export async function getCurFact(id) {
    return await get(`${endpoints.all}/${id}`);
}
export async function postFact(data) {
    await post(endpoints.all, data);
}

export async function editFact(id, data) {
    await put(`${endpoints.all}/${id}`, data);
}

export async function deleteFact(id) {
    await del(`${endpoints.all}/${id}`);
}