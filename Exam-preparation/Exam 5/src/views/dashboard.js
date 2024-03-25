import { getAllGames } from "../data/dataService.js";
import { html } from "./middlewear.js";

export async function loadCatalog(ctx) {
    let data = await getAllGames();
    let load = (data) => html `
    <section id="catalog-page">
        <h1>All Games</h1>
        ${data.length>0?
        html`${data.map(el=>html`
        <div class="allGames">
            <div class="allGames-info">
                <img src=${el.imageUrl}>
                <h6>${el.category}</h6>
                <h2>${el.title}</h2>
                <a href="/catalog/${el._id}" class="details-button">Details</a>
            </div>

        </div>`)}`
       :html`<h3 class="no-articles">No articles yet</h3>`}
    </section>`;
    ctx.render(load(data));
}