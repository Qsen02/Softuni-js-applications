import { editProduct, getProductById } from "../data/dataService.js";
import { notify } from "../data/utils.js";
import { page, html } from "./middlewear.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id;
    let data = await getProductById(id);
    let load = (data) => html `
  <section id="edit">
        <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form @submit=${onEdit} class="edit-form">
                <input  .value=${data.item} type="text" name="item" id="item" placeholder="Item" />
                <input .value=${data.imageUrl} type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />
                <input .value=${data.price} type="text" name="price" id="price" placeholder="Price in Euro" />
                <input .value=${data.availability} type="text" name="availability" id="availability" placeholder="Availability Information" />
                <input .value=${data.type} type="text" name="type" id="type" placeholder="Item Type" />
                <textarea .value=${data.description} id="description" name="description" placeholder="More About The Item" rows="10" cols="50"></textarea>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>`;
    ctx.render(load(data));

    async function onEdit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let item = formData.get("item");
        let imageUrl = formData.get("imageUrl");
        let price = formData.get("price");
        let availability = formData.get("availability");
        let type = formData.get("type");
        let description = formData.get("description");
        if (!item || !imageUrl || !price || !availability || !type || !description) {
            notify("All fields required!");
            return;
        }
        await editProduct(id, { item, imageUrl, price, availability, type, description, _id: id });
        event.target.reset();
        page.redirect(`/catalog/${id}`);
    }
}