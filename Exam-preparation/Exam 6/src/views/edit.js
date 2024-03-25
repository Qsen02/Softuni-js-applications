import { editMeme, getCurMeme } from "../data/dataService.js";
import { page, html } from "./middlewear.js";
import { error } from "../data/utils.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id;
    let data = await getCurMeme(id);
    let load = (data) => html `
    <section id="edit-meme">
        <form @submit=${onEdit} data-id=${data._id} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input .value=${data.title} id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea .value=${data.description} id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Image Url</label>
                <input .value=${data.imageUrl} id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>`;
    ctx.render(load(data));
}

async function onEdit(event) {
    event.preventDefault();
    const id = event.target.dataset.id
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");
    if (!title || !description || !imageUrl) {
        error("All fields required!");
        return
    }
    await editMeme(id, { title, description, imageUrl, _id: id });
    event.target.reset();
    page.redirect(`/catalog/${id}`);
}