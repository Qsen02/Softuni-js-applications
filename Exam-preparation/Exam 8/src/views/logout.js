import { page } from "./middlewear.js";
import { deleteUserData } from "../data/utils.js";
import { logouting } from "../data/userService.js";

export async function onLogout() {
    await logouting();
    deleteUserData();
    page.redirect("/");
}