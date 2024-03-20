import { editFact, getCurFact } from "../data/dataService.js";
import { render, html, page } from "./render.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id
    let data = await getCurFact(id);
    let load = (data) => html `
    <section id="edit">
        <div class="form">
            <h2>Edit Fact</h2>
            <form data-id=${data._id} @submit=${onEdit} class="edit-form">
                <input .value=${data.category} type="text" name="category" id="category" placeholder="Category" />
                <input  .value=${data.imageUrl} type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <textarea  .value=${data.description} id="description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
                <textarea  .value=${data.moreInfo} id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50"></textarea>
                <button type="submit">Post</button>
            </form>
        </div>
    </section>`;
    render(load(data));
}

async function onEdit(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    let formData = new FormData(event.target);
    let category = formData.get("category");
    let imageUrl = formData.get("image-url");
    let description = formData.get("description");
    let moreInfo = formData.get("additional-info");
    if (!category || !imageUrl || !description || !moreInfo) {
        return alert("All fields required!");
    }
    await editFact(id, { category, imageUrl, description, moreInfo, _id: id });
    event.target.reset();
    page.redirect(`/catalog/${id}`);
}