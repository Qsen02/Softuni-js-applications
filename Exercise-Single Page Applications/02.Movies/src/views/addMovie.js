import { createMovie } from "../data/dataService.js"
import { render, html, page } from "./render.js";

export function loadCreateForm() {
    let load = () => html `
<section id="add-movie" class="view-section">
        <form @submit=${onCreate} id="add-movie-form" class="text-center border border-light p-5" action="#" method="">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" />
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value="" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>`;
    render(load());
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let img = formData.get("img");
    if (!title || !description || !img) {
        return alert("All fields required!");
    }
    await createMovie({ title, description, img });
    event.target.reset();
    page.redirect("/catalog");
}