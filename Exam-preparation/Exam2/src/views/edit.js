import { put, get } from "../data/api.js";
import { render, html, page } from "./renderer.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id;
    const url = `http://localhost:3030/data/characters/${id}`;
    let data = await get(url);
    let load = (data) => html `
    <section id="edit">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form data-id=${data._id} @submit=${editCharacter} class="edit-form">
                <input .value=${data.category} type="text" name="category" id="category" placeholder="Character Type" />
                <input .value=${data.imageUrl} type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <textarea .value=${data.description} id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
                <textarea .value=${data.moreInfo} id="additional-info" name="additional-info" placeholder="Additional Info" rows="2" cols="10"></textarea>
                <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>`;
    render(load(data));
}

async function editCharacter(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    let formData = new FormData(event.target);
    let category = formData.get("category");
    let imageUrl = formData.get("image-url");
    let description = formData.get("description");
    let moreInfo = formData.get("additional-info");
    if (!category || !imageUrl || !description || !moreInfo) {
        return alert("All fields are required!");
    }
    const url = `http://localhost:3030/data/characters/${id}`;
    await put(url, { category, imageUrl, description, moreInfo, _id: id });
    event.target.reset();
    page.redirect(`/catalog/${id}`);
}