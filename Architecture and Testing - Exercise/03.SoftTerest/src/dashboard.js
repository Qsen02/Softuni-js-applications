import { html, render } from "./nav.js";
import { request } from "./data/requester.js";
import { loadDetails } from "./details.js";

export async function loadDashboard() {
    const url = "http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc";
    let data = await request("get", url);
    if (data) {
        let ideas = () => html `
        <div id="dashboard-holder">
        ${loadIdea(data)}
        </div>`;
        render(ideas);
    } else {
        let ideas = () => html `
        <div id="dashboard-holder">
        <h1>No ideas yet! Be the first one :)</h1>
        </div>`;
        render(ideas);
    }
}

function loadIdea(data) {
    return data.map(el => html `
            <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">${el.title}</p>
            </div>
            <img class="card-image" src=${el.img} alt="Card image cap">
            <a class="btn" href="" @click=${loadDetails} data-id=${el._id}>Details</a>
            </div>`);
}