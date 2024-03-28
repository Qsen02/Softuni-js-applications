import { getAllEvents } from "../data/dataService.js";
import { html } from "./middlewear.js";

export async function loadCatalog(ctx) {
    let data = await getAllEvents();
    let load = (data) => html `
  <h2>Current Events</h2>
    <section id="dashboard">
        ${data.length>0?
        html`${data.map(el=>html`
        <div class="event">
            <img src=${el.imageUrl} alt="example1" />
            <p class="title">${el.name}</p>
            <p class="date">${el.date}</p>
            <a class="details-btn" href="/catalog/${el._id}">Details</a>
        </div>`)}`
        :html`<h4>No Events yet.</h4>`}
    </section>`;
    ctx.render(load(data));
}