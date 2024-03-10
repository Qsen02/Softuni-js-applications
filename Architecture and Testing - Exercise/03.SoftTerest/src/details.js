import { html, render } from "./nav.js";
import { getUserData } from "./data/utils.js";
import { request } from "./data/requester.js";
import { loadDashboard } from "./dashboard.js";
export function loadDetails(event) {
    event.preventDefault();
    let id = event.target.dataset.id;
    loadCurDetails(id);
}

async function loadCurDetails(id) {
    let curUserData = getUserData();
    const url = `http://localhost:3030/data/ideas/${id}`;
    let data = await request("get", url);
    let details = () => loading(data, curUserData);
    render(details);
}

async function onDelete(event) {
    let id = event.target.dataset.id;
    const url = `http://localhost:3030/data/ideas/${id}`
    await request("delete", url);
    await loadDashboard();
}

function loading(data, userData) {
    return html `
    <div class="container home some">
    <img class="det-img" src=${data.img} />
    <div class="desc">
        <h2 class="display-5">${data.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${data.description}</p>
    </div>
    <div class="text-center">
        ${!userData|| data._ownerId!=userData._id? html``:html`<a @click=${onDelete} class="btn detb" href="" data-id=${data._id}>Delete</a>`}
    </div>
</div>`;
}