import { html, render as litRender } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

const root = document.querySelector("main");

export function render(view) {
    Array.from(root.children).forEach(el => el.remove());
    litRender(view(), root);
}

export {
    html,
    page
}