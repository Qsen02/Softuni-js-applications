import { render, html } from "./renderer.js";

export function loadHome() {
    let loading = () => html `
    <section id="hero">
        <h1>
            Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
        </h1>
    </section>`
    render(loading());
}