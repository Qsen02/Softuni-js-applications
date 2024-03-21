import { deleteMotorcycle } from "../data/dataServices.js";
import { page } from "./render.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    let confirming = confirm("Are you sure?");
    if (confirming) {
        await deleteMotorcycle(id);
        page.redirect("/catalog");
    }
}