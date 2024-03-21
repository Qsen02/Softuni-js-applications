import { searching } from "../data/searcService.js";
import { render, html } from "./render.js";

export async function loadSearchForm() {
    let load = () => html `
 <section id="search">
<div class="form">
    <h4>Search</h4>
    <form @submit=${onSearch} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4 id="result-heading">Results:</h4>
</section>`;
    render(load());
}

async function onSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let userInput = formData.get("search");
    if (!userInput) {
        return alert("Field must be filled!");
    }
    let data = await searching(userInput);
    let load = (data) => html `
 <section id="search">

<div class="form">
    <h4>Search</h4>
    <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
    </form>
</div>
<h4 id="result-heading">Results:</h4>
<div class="search-result">
    ${data.length==0?
    html`<h2 class="no-avaliable">No result.</h2>`
    :html`${data.map(el=>html`
    <div class="motorcycle">
        <img src=${el.imageUrl} alt="example1" />
        <h3 class="model">${el.model}</h3>
        <a class="details-btn" href="/catalog/${el._id}">More Info</a>
    </div>`)}`
    }
</div>
</section>`;
render(load(data));
}