import { createEvent } from "../data/dataService.js";
import { html, page } from "./middlewear.js";

export function loadCreateFrom(ctx) {
    let load = () => html `
    <section id="create">
        <div class="form">
            <h2>Add Event</h2>
            <form  @submit=${onCreate} class="create-form">
                <input type="text" name="name" id="name" placeholder="Event" />
                <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
                <input type="text" name="category" id="event-category" placeholder="Category" />


                <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>

                <input type="text" name="date" id="date" placeholder="When?" />

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
    let date = formData.get("date");
    if (!name || !imageUrl || !category || !description || !date) {
        return alert("All fields required!");
    }
    await createEvent({ name, imageUrl, category, description, date });
    event.target.reset();
    page.redirect("/catalog");
}