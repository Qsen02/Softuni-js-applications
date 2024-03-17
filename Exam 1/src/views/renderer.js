import { render as litRender, html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { getUserData } from "../data/utils.js";

const root = document.querySelector("main");
const links = document.querySelectorAll("header a");
let linkArray = Array.from(links);

export function render(view) {
    let userData = getUserData();
    litRender(view, root);
    if (userData) {
        linkArray[0].style.display = "inline-block";
        linkArray[1].style.display = "inline-block";
        linkArray[2].style.display = "inline-block";
        linkArray[3].style.display = "inline-block";
        linkArray[4].style.display = "inline-block";
        linkArray[5].style.display = "none";
        linkArray[6].style.display = "none";
    } else {
        linkArray[0].style.display = "inline-block";
        linkArray[1].style.display = "inline-block";
        linkArray[2].style.display = "inline-block";
        linkArray[3].style.display = "none";
        linkArray[4].style.display = "none";
        linkArray[5].style.display = "inline-block";
        linkArray[6].style.display = "inline-block";
    }
}

export {
    html,
    page
}