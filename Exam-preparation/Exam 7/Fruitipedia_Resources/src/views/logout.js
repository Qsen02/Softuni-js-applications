import { logouting } from "../data/userService.js";
import { page } from "./renderer.js";
import { deleteUserData } from "../data/utils.js";

export async function onLogout() {
    logouting();
    deleteUserData();
    page.redirect("/")
}