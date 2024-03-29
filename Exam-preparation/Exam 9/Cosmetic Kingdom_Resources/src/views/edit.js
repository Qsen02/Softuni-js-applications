import { editProduct, getProductById } from "../data/dataService.js";
import { page, html } from "./middlewear.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id;
    let data = await getProductById(id);
    let load = (data) => html `
    <section id="edit">
  <div class="form">
    <h2>Edit Product</h2>
    <form @submit=${onEdit} class="edit-form">
      <input
        .value=${data.name}
        type="text"
        name="name"
        id="name"
        placeholder="Product Name"
      />
      <input
      .value=${data.imageUrl}
        type="text"
        name="imageUrl"
        id="product-image"
        placeholder="Product Image"
      />
      <input
      .value=${data.category}
        type="text"
        name="category"
        id="product-category"
        placeholder="Category"
      />
      <textarea
      .value=${data.description}
        id="product-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
      ></textarea>

      <input
      .value=${data.price}
        type="text"
        name="price"
        id="product-price"
        placeholder="Price"
      />
      <button type="submit">post</button>
    </form>
  </div>
</section>`;
    ctx.render(load(data));

    async function onEdit(event) {
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
        await editProduct(id, { name, imageUrl, category, description, price, _id: id });
        event.target.reset();
        page.redirect(`/catalog/${id}`);
    }
}