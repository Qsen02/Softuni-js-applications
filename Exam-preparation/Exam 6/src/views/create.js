import { postMeme } from "../data/dataService.js";
import { page, html } from "./middlewear.js";
import { error } from "../data/utils.js";

export function loadCreateForm(ctx) {
    let load = () => html `
    <section id="create-meme">
        <form @submit=${onCreate} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`;
    ctx.render(load());
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");
    if (!title || !description || !imageUrl) {
        error("All fields required!");
        return;
    }
    await postMeme({ title, description, imageUrl });
    event.target.reset();
    page.redirect("/catalog");
}