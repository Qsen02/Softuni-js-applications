import {get } from "../data/api.js";
import { render, html } from "./renderer.js";

export async function loadCatalog() {
    const url = "http://localhost:3030/data/characters?sortBy=_createdOn%20desc";
    let data = await get(url);
    if (data.length > 0) {
        let load = (data) => html `
 <h2>Characters</h2>
    <section id="characters">
        ${data.map(el=>html`
        <div class="character">
            <img src=${el.imageUrl} alt="example1" />
            <div class="hero-info">
                <h3 class="category">${el.category}</h3>
                <p class="description">${el.description}</p>
                <a class="details-btn" href="/catalog/${el._id}">More Info</a>
            </div>
        </div>`)}
    </section>`;
    render(load(data));
    } else {
let load=()=>html`
 <h2>Characters</h2>
 <h2>No added Heroes yet.</h2>`;
 render(load());
    }
}