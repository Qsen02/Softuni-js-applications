import { getRecentGames } from "../data/dataService.js";
import { updateNav } from "../data/utils.js";
import { html } from "./middlewear.js";

export async function loadHome(ctx) {
    let data = await getRecentGames();
    let load = (data) => html `
    <section id="welcome-world">
        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">
        <div id="home-page">
            <h1>Latest Games</h1>
            ${data.length>0?
            html` ${data.map(el=>html`
            <div class="game">
                <div class="image-wrap">
                    <img src=${el.imageUrl}>
                </div>
                <h3>${el.title}</h3>
                <div class="rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
                <div class="data-buttons">
                    <a href="/catalog/${el._id}" class="btn details-btn">Details</a>
                </div>
            </div>`)}
        </div>`
         : html`<p class="no-articles">No games yet</p>`}
    </section>`;
    ctx.render(load(data));
    updateNav();
}