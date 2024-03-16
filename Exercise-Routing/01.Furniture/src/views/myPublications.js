import { render, html } from "./renderer.js";
import {get } from "../data/api.js";
import { getUserData } from "../data/utils.js";

export async function loadMyPublications() {
    let userData = getUserData();
    const url = `http://localhost:3030/data/catalog?where=_ownerId%3D%22${userData._id}%22`;
    let data = await get(url);
    let loadItems = (data) => html `
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
    </div>
    <div class="row space-top">
        ${data?.map(el=> html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${el.img} />
                            <p>${el.description}</p>
                            <footer>
                                <p>Price: <span>${el.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/catalog/${el._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>`)}
    </div>`;
    render(loadItems(data));
}