import {get } from "../data/api.js";
import { deleteUserData } from "../data/utils.js";
import { page } from "./renderer.js";

export async function onLogout() {
    const url = "http://localhost:3030/users/logout"
    await get(url);
    deleteUserData();
    page.redirect("/home");
}