import { bought } from "../data/dataService.js";
import { page } from "./middlewear.js";

export async function onBought(ctx) {
    const id = ctx.params.id;
    await bought({ producId: id });
    page.redirect(`/catalog/${id}`);
}