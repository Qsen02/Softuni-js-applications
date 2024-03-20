import { postFact } from "../data/dataService.js";
import { render, html, page } from "./render.js";

export function loadCreateForm() {
    let load = () => html `
    <section id="create">
        <div class="form">
            <h2>Add Fact</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="category" id="category" placeholder="Category" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
                <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50"></textarea>
                <button type="submit">Add Fact</button>
            </form>
        </div>
    </section>`;
    render(load());
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let category = formData.get("category");
    let imageUrl = formData.get("image-url");
    let description = formData.get("description");
    let moreInfo = formData.get("additional-info");
    if (!category || !imageUrl || !description || !moreInfo) {
        return alert("All fields required!");
    }
    await postFact({ category, imageUrl, description, moreInfo });
    event.target.reset();
    page.redirect("/catalog");
}