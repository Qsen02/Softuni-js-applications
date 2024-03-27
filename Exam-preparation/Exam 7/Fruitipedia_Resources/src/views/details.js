import { getFruitById } from "../data/dataService.js";
import { getUserData } from "../data/utils.js";
import { html, render } from "./renderer.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let data = await getFruitById(id);
    let userData = getUserData();
    let load = (data, id) => html `
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.name}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p>${data.description}</p>
                    <p id="nutrition">Nutrition</p>
                    <p id="details-nutrition">${data.nutrition}</p>
                </div>
                ${userData&&userData?._id==data._ownerId?
                html`<div id="action-buttons">
                    <a href="/edit/${id}" id="edit-btn">Edit</a>
                    <a href="/delete/${id}" id="delete-btn">Delete</a>
                </div>`
                :null}
            </div>
        </div>
    </section>`;
    render(load(data,id));
}