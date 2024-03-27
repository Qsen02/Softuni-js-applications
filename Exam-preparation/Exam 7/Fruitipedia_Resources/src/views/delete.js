import { deleteFruit } from "../data/dataService.js";
import { page } from "./renderer.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    let isConfirm = confirm("Are you sure?");
    if (isConfirm) {
        await deleteFruit(id);
        page.redirect("/catalog");
    }
}