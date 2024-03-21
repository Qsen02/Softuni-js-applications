import { editMotorcycle, getCurMotorcycle } from "../data/dataServices.js";
import { render, html, page } from "./render.js";

export async function loadEditForm(ctx) {
    const id = ctx.params.id;
    let data = await getCurMotorcycle(id);
    let load = (data) => html `
 <section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form">
            <h2>Edit Motorcycle</h2>
            <form data-id=${data._id} @submit=${onEdit} class="edit-form">
                <input .value=${data.model} type="text" name="model" id="model" placeholder="Model" />
                <input .value=${data.imageUrl} type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" />
                <input .value=${data.year} type="number" name="year" id="year" placeholder="Year" />
                <input .value=${data.mileage} type="number" name="mileage" id="mileage" placeholder="mileage" />
                <input .value=${data.contact} type="number" name="contact" id="contact" placeholder="contact" />
                <textarea .value=${data.about} id="about" name="about" placeholder="about" rows="10" cols="50"></textarea>
                <button type="submit">Edit Motorcycle</button>
            </form>
        </div>
    </section>`;
    render(load(data));
}

async function onEdit(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
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
    await editMotorcycle(id, { model, imageUrl, year, mileage, contact, about, _id: id });
    event.target.reset();
    page.redirect(`/catalog/${id}`);
}