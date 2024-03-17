import { post } from "../data/api.js";
import { page } from "./renderer.js";

export async function onLike(ctx) {
    const id = ctx.params.id;
    const url = "http://localhost:3030/data/useful";
    await post(url, { characterId: id });
    page.redirect(`/catalog/${id}`);
}