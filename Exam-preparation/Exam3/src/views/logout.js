import { logouting } from "../data/userService.js";
import { page } from "./render.js";
import { deleteUserData } from "../data/utils.js";

export async function onLogout() {
    await logouting();
    deleteUserData();
    page.redirect("/home");
}