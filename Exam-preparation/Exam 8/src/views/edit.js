import { editEvent, getEventById } from "../data/dataService.js";
import { html, page } from "./middlewear.js";

export async function loadEditFrom(ctx) {
    const id = ctx.params.id;
    let data = await getEventById(id);
    let load = (data) => html `
    <section id="create">
        <div class="form">
            <h2>Edit Event</h2>
            <form  @submit=${onEdit} class="create-form">
                <input  type="text" name="name" id="name" placeholder="Event" .value=${data.name} />
                <input  type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" .value=${data.imageUrl} />
                <input  type="text" name="category" id="event-category" placeholder="Category" .value=${data.category} />
                <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"  .value=${data.description} ></textarea>
                <input type="text" name="date" id="date" placeholder="When?" .value=${data.date} />
                <button type="submit">Edit</button>
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
        let date = formData.get("date");
        if (!name || !imageUrl || !category || !description || !date) {
            return alert("All fields required!");
        }
        await editEvent(id, { name, imageUrl, category, description, date, _id: id });
        event.target.reset();
        page.redirect(`/catalog/${id}`);
    }
}