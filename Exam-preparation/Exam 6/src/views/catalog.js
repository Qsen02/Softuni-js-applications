import { getAllMemes } from "../data/dataService.js";
import { html } from "./middlewear.js";

export async function loadCatalog(ctx) {
    let data = await getAllMemes();
    let load = (data) => html `
     <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${data.length>0?
           html`${data.map(el=>html`<div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">${el.title}</p>
                        <img class="meme-image" alt="meme-img" src=${el.imageUrl}>
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="/catalog/${el._id}">Details</a>
                    </div>
                </div>
            </div>`)}`
            : html`<p class="no-memes">No memes in database.</p>`
            }
        </div>
    </section>`;
    ctx.render(load(data));
}