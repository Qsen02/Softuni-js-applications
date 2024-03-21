import { render, html } from "./render.js";
export function loadHome() {
    let load = () => html `
    <section id="home">
        <h1>
            Welcome to <span>Samurider</span> moto market, your premier destination for Japanese motorcycles.</h1>
        <img src="./images/motorcycle.png" alt="home" />

    </section>`;
    render(load());
}