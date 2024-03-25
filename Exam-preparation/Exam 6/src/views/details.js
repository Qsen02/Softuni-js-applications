import { getCurMeme, deleteMeme } from "../data/dataService.js";
import { getUserData } from "../data/utils.js";
import { html, page } from "./middlewear.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let userData = getUserData();
    let data = await getCurMeme(id);
    let load = (data) => html `
    <section id="meme-details">
        <h1>Meme Title: ${data.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${data.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${data.description}</p>
                ${userData && userData?._id==data._ownerId?
                html`<a class="button warning" href="/edit/${data._id}">Edit</a>
                <button @click=${onDelete} data-id=${data._id} class="button danger">Delete</button>`
               :null }
            </div>
        </div>
    </section>`;
    ctx.render(load(data));
}

async function onDelete(event){
   const id=event.target.dataset.id;
   let isConfirm=confirm("Are you sure?");
   if(isConfirm){
    await deleteMeme(id);
    page.redirect("/catalog");
   }
}