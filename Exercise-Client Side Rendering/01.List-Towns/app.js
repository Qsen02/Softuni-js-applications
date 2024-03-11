import { render, html } from "./node_modules/lit-html/lit-html.js"
const root = document.getElementById("root");
const btnRef = document.getElementById("btnLoadTowns");
const inputRef = document.getElementById("towns");
btnRef.addEventListener("click", loadList);

function loadList(event) {
    event.preventDefault();
    let towns = inputRef.value.split(", ");
    let town = (towns) => html `
  <ul>
    ${mapTowns(towns)}
  </ul>`;

    render(town(towns), root);

    function mapTowns(towns) {
        return towns.map(el => html `<li>${el}</li>`);
    }
}