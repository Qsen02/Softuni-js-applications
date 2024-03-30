import {get, post } from "./api.js";

let endpoints = {
    login: "/users/login",
    logout: "/users/logout",
    register: "/users/register"
}

export async function logingIn(data) {
    return await post(endpoints.login, data);
}

export async function registration(data) {
    return await post(endpoints.register, data);
}

export async function logouting() {
    await get(endpoints.logout);
}