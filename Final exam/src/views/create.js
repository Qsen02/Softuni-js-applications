import { createProduct } from "../data/dataService.js";
import { notify } from "../data/utils.js";
import { page, html } from "./middlewear.js";

export function loadCreateForm(ctx) {
    let load = () => html `
 <section id="create">
        <div class="form form-item">
            <h2>Share Your item</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="item" id="item" placeholder="Item" />
                <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />
                <input type="text" name="price" id="price" placeholder="Price in Euro" />
                <input type="text" name="availability" id="availability" placeholder="Availability Information" />
                <input type="text" name="type" id="type" placeholder="Item Type" />
                <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50"></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    </section>`;
    ctx.render(load());
}

async function onCreate(event) {
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
    await createProduct({ item, imageUrl, price, availability, type, description });
    event.target.reset();
    page.redirect("/catalog");
}