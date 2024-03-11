import { render, html } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";
search();

function search() {
    const townsList = document.getElementById("towns");
    const result = document.getElementById("result");
    const btnRef = document.querySelector("button");
    const inputRef = document.getElementById("searchText");
    btnRef.addEventListener("click", matching);

    let allTowns = (towns) => html `
<ul>
  ${towns.map(el=> html`<li>${el}</li>`)}
</ul>`;

    render(allTowns(towns),townsList);

    function matching() {
       let searchingTown=inputRef.value;
       let towns=Array.from(townsList.children[0].children);
       let count=0;
       if(!searchingTown){
          return;
       }
       for(let town of towns){
         if(town.textContent.includes(searchingTown)){
             town.classList.add("active");
             count++;
          }else{
            town.classList.remove("active");
          }
       }
       result.textContent=`${count} matches found`
    }
}