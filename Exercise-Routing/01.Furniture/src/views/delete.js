import { del } from "../data/api.js";
import { page } from "./renderer.js";

export async function deleteContent(ctx) {
    let id = ctx.params.id;
    alert("Are you sure?");
    const url = `http://localhost:3030/data/catalog/${id}`;
    await del(url);
    page.redirect("/catalog");
}