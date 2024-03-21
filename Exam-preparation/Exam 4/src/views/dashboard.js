import { getAllMotorcycles } from "../data/dataServices.js";
import { render, html } from "./render.js";

export async function loadCatalog() {
    let data = await getAllMotorcycles();
    let load = (data) => html `
      <h2>Available Motorcycles</h2>
    <section id="dashboard">
        ${data.length>0?
       html`${data.map(el=>html`<div class="motorcycle">
            <img src=${el.imageUrl} alt="example1" />
            <h3 class="model">${el.model}</h3>
            <p class="year">Year: ${el.year}</p>
            <p class="mileage">Mileage: ${el.mileage}</p>
            <p class="contact">Contact Number: ${el.contact}</p>
            <a class="details-btn" href="/catalog/${el._id}">More Info</a>
        </div>`)}`
       :html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
    </section>`;
    render(load(data));
}