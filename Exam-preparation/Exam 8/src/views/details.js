import { getEventById } from "../data/dataService.js";
import { getLikesForEvent, getCurUserLikes } from "../data/likeService.js";
import { html } from "./middlewear.js";
import { getUserData } from "../data/utils.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let data = await getEventById(id);
    let likes = await getLikesForEvent(id);
    let userData = getUserData();
    let isLike = 0;
    if (userData) {
        isLike = await getCurUserLikes(userData._id, id);
    }
    let load = (data, likes, isLike) => html `
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
                Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
                Date:<span id="date">${data.date}</span></p>
            <div id="info-wrapper">
                <div id="details-description">
                    <span>${data.description}</span>
                </div>
            </div>
            <h3>Going: <span id="go">${likes}</span> times.</h3>
            <div id="action-buttons">
            ${userData
            ?html`${userData._id==data._ownerId?
                html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
                :html`${!isLike?html`<a href="/like/${data._id}" id="go-btn">Going</a>`:null}`}`:null}
            </div>
        </div>
    </section>`;
    ctx.render(load(data,likes,isLike));
}