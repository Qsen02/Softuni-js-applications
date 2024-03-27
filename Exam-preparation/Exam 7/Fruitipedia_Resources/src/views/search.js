import { searchFruit } from "../data/dataService.js";
import { html } from "./middlewear.js";

export function loadSearchForm(ctx) {
    let load = () => html `
<section id="search">
<div class="form">
    <h2>Search</h2>
    <form  @submit=${onSearch} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4>Results:</h4>
</section>`;
    ctx.render(load());

    async function onSearch(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let value = formData.get("search");
        if (!value) {
            return alert("Field must be filled!");
        }
        let data = await searchFruit(value);
        let load = (data) => html `
      <section id="search">
    <div class="form">
        <h2>Search</h2>
        <form class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
        ${data.length==0?
       html`<p class="no-result">No result.</p>`
      :html`
        ${data.map(el=>html`
        <div class="fruit">
            <img src=${el.imageUrl} alt="example1" />
            <h3 class="title">${el.name}</h3>
            <p class="description">${el.description}</p>
            <a class="details-btn" href="/catalog/${el._id}">More Info</a>
        </div>`)}`}
    </div>
    </section>`
        ctx.render(load(data));
    }
}