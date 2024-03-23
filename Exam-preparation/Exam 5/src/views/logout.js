import { logouting } from "../data/userService.js";
import { deleteUserData, updateNav } from "../data/utils.js";
import { page } from "./middlewear.js";

export async function onLogout() {
    await logouting();
    deleteUserData();
    page.redirect("/");
    updateNav();
}