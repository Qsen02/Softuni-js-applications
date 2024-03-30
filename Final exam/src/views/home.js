import { html } from "./middlewear.js";

export function loadHome(ctx) {
    let load = () => html `
   <section id="hero">
        <img src="./images/home.png" alt="home" />
        <p>We know who you are, we will contact you</p>
    </section>`;
    ctx.render(load());
}