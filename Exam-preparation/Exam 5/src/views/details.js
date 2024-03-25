import { getGamesById } from "../data/dataService.js";
import { getComments, postComment } from "../data/commentService.js";
import { updateNav, getUserData } from "../data/utils.js";
import { html, page } from "./middlewear.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let userData = getUserData();
    let comments = await getComments(id);
    let data = await getGamesById(id);
    let load = (data, gameId, ownerId, comments) => html `
<section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src=${data.imageUrl} />
                <h1>${data.title}</h1>
                <span class="levels">MaxLevel: ${data.maxLevel}</span>
                <p class="type">${data.category}</p>
            </div>

            <p class="text">${data.summary}</p>
            <div class="details-comments">
                <h2>Comments:</h2>
                <ul>
                    ${comments.length>0
                    ?html`${comments.map(el=>
                    html`<li class="comment">
                        <p>${el.comment}</p>
                    </li>`)}`
                    : html` <p class="no-comment">No comments.</p>`}
                </ul>
            </div>
            ${userData && userData?._id==ownerId?
            html`
            <div class="buttons">
                <a href="/edit/${gameId}" class="button">Edit</a>
                <a href="/delete/${gameId}" class="button">Delete</a>
            </div>`
            :null}
        </div>
        ${userData && userData?._id!=ownerId?
        html`<article class="create-comment">
            <label>Add new comment:</label>
            <form  data-id=${gameId} @submit=${addComment} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`
        :null}
    </section>`;
    ctx.render(load(data,id,data._ownerId,comments));
    // updateNav();
}

async function addComment(event){
    event.preventDefault();
    const gameId=event.target.dataset.id;
    let formData=new FormData(event.target);
    let comment=formData.get("comment");
    if(!comment){
        return alert("Field must be filled!");
    }
    await postComment({gameId,comment});
    event.target.reset();
    page.redirect(`/catalog/${gameId}`);
}