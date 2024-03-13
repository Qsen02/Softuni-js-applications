import { html, render, page } from "./nav.js";
import { getUserData } from "./data/utils.js";
import { del, get } from "./data/requester.js"
export function loadDetails(ctx) {
    let movieId = ctx.params.id;
    loadCurDetails(movieId);
}

async function loadCurDetails(id) {
    let curUserData = getUserData();
    const url = `http://localhost:3030/data/ideas/${id}`;
    let data = await get(url);
    let details = () => loading(data, curUserData);
    render(details);
}

async function onDelete(event) {
    let id = event.target.dataset.id;
    const url = `http://localhost:3030/data/ideas/${id}`
    await del(url);
    page.redirect("/dashboard");
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