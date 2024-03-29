import { getAllProducts } from "../data/dataService.js";
import { html } from "./middlewear.js";

export async function loadCatalog(ctx) {
    let data = await getAllProducts();
    let load = (data) => html `
<h2>Products</h2>
    <section id="dashboard">
        ${data.length>0?
        html`${data.map(el=>html`
        <div class="product">
            <img src=${el.imageUrl} alt="example1" />
            <p class="title">${el.name}</p>
            <p><strong>Price:</strong><span class="price">${el.price}</span>$</p>
            <a class="details-btn" href="/catalog/${el._id}">Details</a>
        </div>`)}`
        :html`<h2>No products yet.</h2>`}
    </section>`;
    ctx.render(load(data));
}