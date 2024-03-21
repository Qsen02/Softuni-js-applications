import { createMotorcycle } from "../data/dataServices.js";
import { render, html, page } from "./render.js";

export function loadCreateForm() {
    let load = () => html `
 <section id="create">
        <h2>Add Motorcycle</h2>
        <div class="form">
            <h2>Add Motorcycle</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="model" id="model" placeholder="Model" />
                <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" />
                <input type="number" name="year" id="year" placeholder="Year" />
                <input type="number" name="mileage" id="mileage" placeholder="mileage" />
                <input type="text" name="contact" id="contact" placeholder="contact" />
                <textarea id="about" name="about" placeholder="about" rows="10" cols="50"></textarea>
                <button type="submit">Add Motorcycle</button>
            </form>
        </div>
    </section>`
    render(load());
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let model = formData.get("model");
    let imageUrl = formData.get("imageUrl");
    let year = formData.get("year");
    let mileage = formData.get("mileage");
    let contact = formData.get("contact");
    let about = formData.get("about");
    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return alert("All fields required!");
    }
    await createMotorcycle({ model, imageUrl, year, mileage, contact, about });
    event.target.reset();
    page.redirect("/catalog");
}