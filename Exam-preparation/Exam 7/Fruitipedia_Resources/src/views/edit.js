import { editFruit, getFruitById } from "../data/dataService.js";
import { page, html } from "./middlewear.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id;
    let data = await getFruitById(id);
    let load = (data, id) => html `
     <section id="edit">
        <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onEdit} class="edit-form">
                <input .value=${data.name} type="text" name="name" id="name" placeholder="Fruit Name" />
                <input .value=${data.imageUrl} type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image URL" />
                <textarea .value=${data.description} id="fruit-description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
                <textarea .value=${data.nutrition} id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"></textarea>
                <button type="submit">post</button>
            </form>
        </div>
    </section>`
    ctx.render(load(data, id));

    async function onEdit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let name = formData.get("name");
        let imageUrl = formData.get("imageUrl");
        let description = formData.get("description");
        let nutrition = formData.get("nutrition");
        if (!name || !imageUrl || !description || !nutrition) {
            return alert("All fields required!");
        }
        await editFruit(id, { name, imageUrl, description, nutrition, _id: id });
        event.target.reset();
        page.redirect(`/catalog/${id}`);
    }
}