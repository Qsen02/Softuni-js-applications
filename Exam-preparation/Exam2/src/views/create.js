import { render, html, page } from "./renderer.js";
import { post } from "../data/api.js";

export function loadCreateForm() {
    let load = () => html `
     <section id="create">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form @submit=${onCreate} class="create-form">
                <input type="text" name="category" id="category" placeholder="Character Type" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
                <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2" cols="10"></textarea>
                <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>`
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
        return alert("All fields are required!");
    }
    const url = "http://localhost:3030/data/characters";
    await post(url, { category, imageUrl, description, moreInfo });
    event.target.reset();
    page.redirect("/catalog");
}