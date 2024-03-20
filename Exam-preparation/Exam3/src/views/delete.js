import { deleteFact } from "../data/dataService.js";
import { page } from "./render.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    let confirming = confirm("Are you sure?");
    if (confirming) {
        await deleteFact(id);
        page.redirect("/catalog");
    }
}