import {get, post } from "./api.js";

const baseUrl = "http://localhost:3030";
let endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout"
}

export async function registration(data) {
    return await post(`${baseUrl}${endpoints.register}`, data);
}

export async function logingIn(data) {
    return await post(`${baseUrl}${endpoints.login}`, data);
}

export async function logouting() {
    await get(`${baseUrl}${endpoints.logout}`);
}