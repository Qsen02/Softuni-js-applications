import { getCurMotorcycle } from "../data/dataServices.js";
import { render, html } from "./render.js";
import { getUserData } from "../data/utils.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let data = await getCurMotorcycle(id);
    let userData = getUserData();
    let load = (data) => html `
 <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.model}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="year">Year: ${data.year}</p>
                    <p class="mileage">Mileage: ${data.mileage}</p>
                    <p class="contact">Contact Number: ${data.contact}</p>
                    <p id="motorcycle-description">
                       ${data.about}
                    </p>
                </div>
                <div id="action-buttons">
                    ${userData && userData?._id==data._ownerId?
                    html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                         <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
                    : null}
                </div>
            </div>
        </div>
    </section>`;
    render(load(data));
}