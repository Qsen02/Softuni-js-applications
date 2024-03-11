import { render, html } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const root = document.getElementById("allCats");

let httpCats = (cats) => html `
<ul>
${cats.map(el=>html`
<li>
 <img src="./images/${el.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
 <div class="info">
    <button class="showBtn" @click=${show}>Show status code</button>
    <div class="status" style="display: none" id=${el.id}>
        <h4>Status Code: ${el.statusCode}</h4>
        <p>${el.statusMessage}</p>
    </div>
 </div>
</li>`)}
</ul>`;

render(httpCats(cats),root);

  function show(event){
   let target=event.target;
   let statusMessage=target.parentElement.children[1];
   target.textContent=target.textContent=="Show status code"?"Hide status code":"Show status code";
   statusMessage.style.display=statusMessage.style.display=="none"?"block":"none";
 }