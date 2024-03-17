import { render, html } from "./renderer.js";
import {get } from "../data/api.js";
import { getUserData } from "../data/utils.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    const url = `http://localhost:3030/data/cars/${id}`;
    let data = await get(url);
    let userData = getUserData();
    let load = (data) => html `
   <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.model}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="price">Price: ${data.price}</p>
                    <p class="weight">Weight: ${data.weight}</p>
                    <p class="top-speed">Top Speed: ${data.speed}</p>
                    <p id="car-description">
                       ${data.about}
                    </p>
                </div>
                <div id="action-buttons">
                ${userData&&userData._id==data._ownerId
               ? html`
                    <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
               :null}
                  </div>
            </div>
        </div>
    </section>`
    render(load(data));
}