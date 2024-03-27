import { getFruits } from "../data/dataService.js";
import { html, render } from "./renderer.js";

export async function loadCatalog() {
    let data = await getFruits();
    let load = (data) => html `
    <h2>Fruits</h2>
    <section id="dashboard">
        ${data.length>0?
        html`${data.map(el=>html`
        <div class="fruit">
            <img src=${el.imageUrl} alt="example1" />
            <h3 class="title">${el.name}</h3>
            <p class="description">${el.description}</p>
            <a class="details-btn" href="/catalog/${el._id}">More Info</a>
        </div>`)}`
        :html`<h2>No fruit info yet.</h2>`}
    </section>`;
    render(load(data));
}