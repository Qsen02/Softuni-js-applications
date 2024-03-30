import { getAllProducts } from "../data/dataService.js";
import { html } from "./middlewear.js";

export async function loadCatalog(ctx) {
    let data = await getAllProducts();
    let load = (data) => html `
 <h3 class="heading">Market</h3>
    <section id="dashboard">
${data.length>0?
       html`${data.map(el=>html`
       <div class="item">
            <img src=${el.imageUrl} alt="example1" />
            <h3 class="model">${el.item}t</h3>
            <div class="item-info">
                <p class="price">Price: ${el.price}</p>
                <p class="availability">${el.availability}</p>
                <p class="type">Type: ${el.type}</p>
            </div>
            <a class="details-btn" href="/catalog/${el._id}">Uncover More</a>
        </div>`)}`
        : html`<h3 class="empty">No Items Yet</h3>`
}
    </section>`;
    ctx.render(load(data));
}