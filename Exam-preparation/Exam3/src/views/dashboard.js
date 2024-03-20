import { getAllFacts } from "../data/dataService.js";
import { render, html } from "./render.js";

export async function loadCatalog() {
    let data = await getAllFacts();
    let load = (data) => html `
    <h2>Fun Facts</h2>
    <section id="dashboard">
     ${data.length>0?
     html`${data.map(el=>html`<div class="fact">
            <img src=${el.imageUrl} alt="example1" />
            <h3 class="category">${el.category}</h3>
            <p class="description">${el.description}</p>
            <a class="details-btn" href="/catalog/${el._id}">More Info</a>
        </div>`)}`
     :html`<h2>No Fun Facts yet.</h2>`}
    </section>`
    render(load(data));
}