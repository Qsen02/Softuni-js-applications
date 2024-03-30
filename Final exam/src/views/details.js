import { getProductById } from "../data/dataService.js";
import { getUserData } from "../data/utils.js";
import { html } from "./middlewear.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let data = await getProductById(id);
    let userData = getUserData();
    let load = (data) => html `
<section id="details">
        <div id="details-wrapper">
            <div>
                <img id="details-img" src=${data.imageUrl} alt="example1" />
                <p id="details-title">${data.item}</p>
            </div>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="details-price">Price: ${data.price}</p>
                    <p class="details-availability">${data.availability}</p>
                    <p class="type">Type: ${data.type}</p>
                    <p id="item-description">${data.description}</p>
                </div>
           ${userData && userData?._id==data._ownerId?
            html`<div id="action-buttons">
                    <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${data._id}" id="delete-btn">Delete</a>
                </div>`
          :null }
            </div>
        </div>
    </section>`;
    ctx.render(load(data));
}