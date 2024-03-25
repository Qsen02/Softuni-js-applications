import { logouting } from "../data/userService.js";
import { deleteUserData } from "../data/utils.js";
import { page } from "./middlewear.js";

export async function onLogout() {
    await logouting();
    deleteUserData();
    page.redirect("/");
}