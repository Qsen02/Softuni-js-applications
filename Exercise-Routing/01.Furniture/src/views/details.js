import { render, html } from "./renderer.js";
import {get } from "../data/api.js";
import { getUserData } from "../data/utils.js";

export function loadDetails(ctx) {
    let id = ctx.params.id;
    loadCurDetails(id);
}

async function loadCurDetails(id) {
    const url = `http://localhost:3030/data/catalog/${id}`;
    let userData = getUserData();
    let data = await get(url);
    let renderContent = (data) => html `
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${data.img} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data?.materail}</span></p>
                <div>
                    ${userData?._id==data._ownerId
                   ?html`<a href="/edit/${data._id}" class="btn btn-info">Edit</a>
                         <a href="/delete/${data._id}" class="btn btn-red">Delete</a>`
                   :"" }
                </div>
            </div>
        </div>`
        render(renderContent(data));
}