import { getDetails, editMovie } from "../data/dataService.js";
import { render, html, page } from "./render.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id;
    let data = await getDetails(id);
    let load = (data) => html `
  <section id="edit-movie" class="view-section">
        <form data-id=${data._id} @submit=${onEdit} class="text-center border border-light p-5" action="#" method="">
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Movie Title" value=${data.title} name="title" />
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea .value=${data.description} class="form-control" placeholder="Movie Description..." name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" value=${data.img} name="img" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>`
    render(load(data));
}

async function onEdit(event) {
    event.preventDefault();
    const id = event.target.dataset.id
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let img = formData.get("img");
    if (!title || !description || !img) {
        return alert("All fileds required!");
    }
    await editMovie(id, { title, description, img, _id: id });
    event.target.reset();
    page.redirect(`/catalog/${id}`);
}