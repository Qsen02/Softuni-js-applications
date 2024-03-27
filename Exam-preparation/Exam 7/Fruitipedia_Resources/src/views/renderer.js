import { render as litRender, html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { updateNav } from "../data/utils.js";

const root = document.querySelector("main");

export function render(view) {
    litRender(view, root);
    updateNav();
}


export {
    html,
    page
}