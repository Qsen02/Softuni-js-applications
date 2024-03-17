import { del } from "../data/api.js";
import { page } from "./renderer.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    const url = `http://localhost:3030/data/characters/${id}`;
    let confirming = confirm("Are you sure?");
    if (confirming) {
        await del(url);
        page.redirect("/catalog");
    }
}