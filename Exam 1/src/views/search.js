import { render, html } from "./renderer.js";
import {get } from "../data/api.js";

export function loadSearch() {
    let load = () => html `
 <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form @submit=${onSearch} class="search-form">
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <div class="search-result">
            <h2 class="no-avaliable">No result.</h2>
</div>
</section>`
    render(load());
}

async function onSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let name = formData.get("search");
    const url = `http://localhost:3030/data/cars?where=model%20LIKE%20%22${name}%22`;
    let data = await get(url);
    if (data.length > 0) {
        let load = (data) => html `
        <section id="search">
               <div class="form">
                   <h4>Search</h4>
                   <form @submit=${onSearch} class="search-form">
                       <input type="text" name="search" id="search-input" .value=${name}/>
                       <button class="button-list">Search</button>
                   </form>
               </div>
               <div class="search-result">
              ${data.map(el=>html`
            <div class="car">
                <img src=${el.imageUrl} alt="example1" />
                <h3 class="model">${el.model}</h3>
                <a class="details-btn" href="/catalog/${el._id}">More Info</a>
            </div>`)}
              </div>
       </section>`
        render(load(data));
    }else{
        let load = () => html `
        <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form @submit=${onSearch} class="search-form">
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <div class="search-result">
            <h2 class="no-avaliable">No result.</h2>
        </div>
       </section>`;
       render(load());
    }
}