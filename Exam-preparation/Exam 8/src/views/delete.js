import { deleteEvent } from "../data/dataService.js";
import { page } from "./middlewear.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    let isConfirm = confirm("Are you sure?");
    if (isConfirm) {
        await deleteEvent(id);
        page.redirect("/catalog");
    }
}