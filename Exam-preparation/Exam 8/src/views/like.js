import { liking } from "../data/likeService.js";
import { page } from "./middlewear.js";

export async function onLike(ctx) {
    const id = ctx.params.id;
    await liking({ eventId: id });
    page.redirect(`/catalog/${id}`);
}