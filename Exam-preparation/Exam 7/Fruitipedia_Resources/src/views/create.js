import { addFruit } from "../data/dataService.js";
import { page, html } from "./middlewear.js";

export function loadCreateForm(ctx) {
    let load = () => html `
    <section id="create">
        <div class="form">
            <h2>Add Fruit</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="name" id="name" placeholder="Fruit Name" />
                <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image" />
                <textarea id="fruit-description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
                <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"></textarea>
                <button type="submit">Add Fruit</button>
            </form>
        </div>
    </section>`
    ctx.render(load());
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let name = formData.get("name");
    let imageUrl = formData.get("imageUrl");
    let description = formData.get("description");
    let nutrition = formData.get("nutrition");
    if (!name || !imageUrl || !description || !nutrition) {
        return alert("All fields required!");
    }
    await addFruit({ name, imageUrl, description, nutrition });
    event.target.reset();
    page.redirect("/catalog");
}