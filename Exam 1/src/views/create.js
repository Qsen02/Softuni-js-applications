import { render, html, page } from "./renderer.js";
import { post } from "../data/api.js";

export function loadCreateForm() {
    let load = () => html `
<section id="create">
        <div class="form form-auto">
            <h2>Share Your Car</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="model" id="model" placeholder="Model" />
                <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" />
                <input type="text" name="price" id="price" placeholder="Price in Euro" />
                <input type="number" name="weight" id="weight" placeholder="Weight in Kg" />
                <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" />
                <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50"></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    </section>`
    render(load());
}

async function onCreate(event) {
    event.preventDefault();
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
    const url = "http://localhost:3030/data/cars";
    await post(url, { model, imageUrl, price, weight, speed, about });
    event.target.reset();
    page.redirect("/catalog");
}