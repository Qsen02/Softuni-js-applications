import { editGame, getGamesById } from "../data/dataService.js";
import { page, html } from "./middlewear.js";

export async function loadEditFrom(ctx) {
    const id = ctx.params.id;
    let data = await getGamesById(id);
    let load = (data, id) => html `
    <section id="edit-page" class="auth">
        <form data-id=${id} @submit=${onEdit} id="edit">
            <div class="container">

                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" value=${data.title}>

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value=${data.category}>

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value=${data.maxLevel}>

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value=${data.imageUrl}>

                <label for="summary">Summary:</label>
                <textarea .value=${data.summary} name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Edit Game">
            </div>
        </form>
    </section>`;
    ctx.render(load(data, id));
}

async function onEdit(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let category = formData.get("category");
    let maxLevel = formData.get("maxLevel");
    let imageUrl = formData.get("imageUrl");
    let summary = formData.get("summary");
    if (!title || !category || !maxLevel || !imageUrl || !summary) {
        return alert("All fields required!");
    }
    await editGame(id, { title, category, maxLevel, imageUrl, summary, _id: id });
    event.target.reset();
    page.redirect(`/catalog/${id}`);
}