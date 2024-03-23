import { deleteGame } from "../data/dataService.js";
import { page } from "./middlewear.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    let isConfirm = confirm("Are you sure?");
    if (isConfirm) {
        await deleteGame(id);
        page.redirect("/");
    }
}