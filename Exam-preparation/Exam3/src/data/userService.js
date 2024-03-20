import {get, post } from "./api.js";
import { getUserData } from "./utils.js";

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

export function updateNav() {
    let userData = getUserData();
    let links = document.querySelectorAll("header a");
    let linkArray = Array.from(links);
    if (userData) {
        linkArray[0].style.display = "inline-block";
        linkArray[1].style.display = "inline-block";
        linkArray[2].style.display = "inline-block";
        linkArray[3].style.display = "inline-block";
        linkArray[4].style.display = "none";
        linkArray[5].style.display = "none";
    } else {
        linkArray[0].style.display = "inline-block";
        linkArray[1].style.display = "inline-block";
        linkArray[2].style.display = "none";
        linkArray[3].style.display = "none";
        linkArray[4].style.display = "inline-block";
        linkArray[5].style.display = "inline-block";
    }
}