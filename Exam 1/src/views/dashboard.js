import { render, html } from "./renderer.js";
import {get } from "../data/api.js";

export async function loadCatalog() {
    const url = "http://localhost:3030/data/cars?sortBy=_createdOn%20desc";
    let data = await get(url);
    if (data.length > 0) {
        let load = (data) => html `
    <h3 class="heading">Our Cars</h3>
    <section id="dashboard">
        ${data.map(el=>html`
       <div class="car">
            <img src=${el.imageUrl} alt="example1" />
            <h3 class="model">${el.model}</h3>
            <div class="specs">
                <p class="price">Price: ${el.price}</p>
                <p class="weight">Weight: ${el.weight}</p>
                <p class="top-speed">Top Speed: ${el.speed}</p>
            </div>
            <a class="details-btn" href="/catalog/${el._id}">More Info</a>
        </div>`)}
    </section>`;
    render(load(data));
    }else{
        let load = () => html `
        <h3 class="heading">Our Cars</h3>
        <h2 class="nothing">Nothing to see yet</h2>`;
        render(load());
    }
}