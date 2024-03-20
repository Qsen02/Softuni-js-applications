import { getCurFact } from "../data/dataService.js";
import { likeForCurFact, likeForUser } from "../data/likeService.js";
import { render, html } from "./render.js";
import { getUserData } from "../data/utils.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let userData = getUserData();
    let likesCount = await likeForCurFact(id);
    let isLiked = 0;
    if (userData) {
        isLiked = await likeForUser(id, userData._id);
    }
    let data = await getCurFact(id);
    let load = (data, likesCount, isLiked) => html `
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-category">${data.category}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">
                      ${data.description}
                    </p>
                    <p id="more-info">
                        ${data.moreInfo}
                    </p>
                </div>
                <h3>Likes:<span id="likes">${likesCount}</span></h3>
                <div id="action-buttons">
                ${userData && userData?._id==data._ownerId?
               html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
                    :userData && !isLiked?html`<a href="/like/${data._id}" id="like-btn">Like</a>`
                    :null}
                </div>
            </div>
        </div>
    </section>`;
    render(load(data,likesCount,isLiked));
}