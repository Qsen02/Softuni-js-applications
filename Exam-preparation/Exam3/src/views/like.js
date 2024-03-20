import { liking } from "../data/likeService.js";
import { page } from "./render.js";

export async function onLike(ctx) {
    const id = ctx.params.id;
    await liking({ factId: id });
    page.redirect(`/catalog/${id}`);
}