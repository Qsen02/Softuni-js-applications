import { deleteUserData } from "../data/utils.js";
import { logouting } from "../data/userService.js";
import { page } from "./render.js";

export async function onLogout() {
    await logouting();
    deleteUserData();
    page.redirect("/login");
}