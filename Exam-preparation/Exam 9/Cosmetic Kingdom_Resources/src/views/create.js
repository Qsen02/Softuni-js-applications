import { createProduct } from "../data/dataService.js";
import { page, html } from "./middlewear.js";

export function loadCreateForm(ctx) {
    let load = () => html `
     <section id="create">
        <div class="form">
            <h2>Add Product</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="name" id="name" placeholder="Product Name" />
                <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
                <input type="text" name="category" id="product-category" placeholder="Category" />
                <textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>

                <input type="text" name="price" id="product-price" placeholder="Price" />

                <button type="submit">Add</button>
            </form>
        </div>
     </section>`;
    ctx.render(load());
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let name = formData.get("name");
    let imageUrl = formData.get("imageUrl");
    let category = formData.get("category");
    let description = formData.get("description");
    let price = formData.get("price");
    if (!name || !imageUrl || !category || !description || !price) {
        return alert("All fields required!");
    }
    await createProduct({ name, imageUrl, category, description, price });
    event.target.reset();
    page.redirect("/catalog");
}