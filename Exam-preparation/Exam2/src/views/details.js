import { getUserData } from "../data/utils.js";
import {get } from "../data/api.js";
import { render, html } from "./renderer.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    const url = `http://localhost:3030/data/characters/${id}`;
    let data = await get(url);
    let userData = getUserData();
    const likeCountUrl = `http://localhost:3030/data/useful?where=characterId%3D%22${data._id}%22&distinct=_ownerId&count`;
    const isCurrentUserLikeUrl = `http://localhost:3030/data/useful?where=characterId%3D%22${data._id}%22%20and%20_ownerId%3D%22${userData?._id}%22&count`;
    let likes = await get(likeCountUrl);
    let isLike = await get(isCurrentUserLikeUrl);
    let load = (data, likes, isLike) => html `
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <div>
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
                </div>
                <h3>Is This Useful:<span id="likes">${likes}</span></h3>

                <div id="action-buttons">
                    ${userData && userData._id==data._ownerId
                    ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
                    :html`${isLike || !userData?null:html`<a href="/likes/${data._id}" id="like-btn">Like</a>`}`}
                </div>
            </div>
        </div>
    </section>`;
    render(load(data,likes,isLike));
}