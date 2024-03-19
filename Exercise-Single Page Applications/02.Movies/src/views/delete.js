import { page } from "./render.js";
import { deleteMovie } from "../data/dataService.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    await deleteMovie(id);
    page.redirect("/catalog");
}