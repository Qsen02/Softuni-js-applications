import { getDetails } from "../data/dataService.js";
import { getLikesForMovie, getLikesForUser } from "../data/likeService.js";
import { getUserData } from "../data/utils.js";
import { render, html } from "./render.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let userData = getUserData();
    let likeCount = await getLikesForMovie(id);
    let isUserLike = [];
    if (userData) {
        isUserLike = await getLikesForUser(id, userData._id);
    }
    let data = await getDetails(id);
    let load = (data, likeCount, isLike) => html `
 <section id="movie-example" class="view-section">
        <div class="container">
            <div class="row bg-light text-dark">
                <h1>Movie title: ${data.title}</h1>

                <div class="col-md-8">
                    <img class="img-thumbnail" src=${data.img} alt="Movie" />
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3">Movie Description</h3>
                    <p>
                       ${data.description}
                    </p>
                    ${userData && userData?._id==data._ownerId
                    ? html` <a class="btn btn-danger" href="/delete/${data._id}">Delete</a>
                    <a class="btn btn-warning" href="/edit/${data._id}">Edit</a>
                    <span class="enrolled-span">Liked ${likeCount}</span>`
                    : isLike.length>0? html`<span class="enrolled-span">Liked ${likeCount}</span>`
                    :userData?html`<a class="btn btn-primary" href="/like/${data._id}">Like</a>`:null
                    }
                </div>
            </div>
        </div>
    </section>`
    render(load(data,likeCount,isUserLike));
}