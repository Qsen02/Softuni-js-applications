import { render, html, page } from "./renderer.js";
import { put, get } from "../data/api.js";
export async function loadEditForm(ctx) {
    let id = ctx.params.id;
    const url = `http://localhost:3030/data/cars/${id}`;
    let data = await get(url)
    let load = (id, data) => html `
<section id="edit">
        <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form @submit=${editCar} data-id=${id} class="edit-form">
                <input type="text" name="model" id="model" placeholder="Model" .value=${data.model} />
                <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" .value=${data.imageUrl} />
                <input type="text" name="price" id="price" placeholder="Price in Euro" .value=${data.price}/>
                <input type="number" name="weight" id="weight" placeholder="Weight in Kg" .value=${data.weight}/>
                <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" .value=${data.speed}/>
                <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50" .value=${data.about}></textarea>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>`
    render(load(id, data));
}

async function editCar(event) {
    event.preventDefault();
    let id = event.target.dataset.id;
    let formData = new FormData(event.target);
    let model = formData.get("model").trim();
    let imageUrl = formData.get("imageUrl").trim();
    let price = formData.get("price").trim();
    let weight = formData.get("weight").trim();
    let speed = formData.get("speed").trim();
    let about = formData.get("about").trim();

    if (!model || !imageUrl || !price || !weight || !speed || !about) {
        return alert("All fields are required!");
    }
    const url = `http://localhost:3030/data/cars/${id}`;
    await put(url, { model, imageUrl, price, weight, speed, about, _id: id });
    event.target.reset();
    page.redirect(`/catalog/${id}`);
}