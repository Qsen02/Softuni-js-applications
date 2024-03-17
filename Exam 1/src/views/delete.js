import { del } from "../data/api.js";
import { page } from "./renderer.js";
export async function onDelete(ctx) {
    let id = ctx.params.id;
    let confirming = confirm("Are you sure?");
    const url = `http://localhost:3030/data/cars/${id}`;
    if (confirming) {
        await del(url);
        page.redirect("/catalog");
    }
}