window.addEventListener("load", start);

async function start() {
    const mainRef = document.querySelector("main");
    let data = await loadRecipes();
    mainRef.replaceChildren(...Object.values(data).map(el => createElements(el)));
}
async function loadRecipes() {
    const url = " http://localhost:3030/jsonstore/cookbook/recipes";
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw response.status;
        }
        data = await response.json();
        return data;
    } catch (error) {
        alert(error);
        throw error;
    }
}

function createElements(data) {
    let articleEl = document.createElement("article");
    articleEl.classList.add("preview");
    let divEl = document.createElement("div");
    divEl.classList.add("title");
    let h2El = document.createElement("h2");
    h2El.textContent = data.name;
    divEl.appendChild(h2El);
    articleEl.appendChild(divEl);
    let divEl2 = document.createElement("div");
    divEl2.classList.add("small");
    let imgEl = document.createElement("img");
    imgEl.src = data.img;
    divEl2.appendChild(imgEl);
    articleEl.appendChild(divEl2);
    articleEl.addEventListener("click", () => loadDetails(data._id, articleEl));
    return articleEl;
}
async function onLoadDetails(id) {
    let url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw response.status;
        }
        let details = await response.json()
        return details;
    } catch (error) {
        alert(error);
        throw error;
    }
}

async function loadingDeatils(data) {
    console.log(await data);
}

async function loadDetails(id, element) {
    let data = await onLoadDetails(id);
    element.innerHTML = `<h2>${data.name}</h2>
                         <div class="band">
                            <div class="thumb">
                               <img src=${data.img}>
                            </div>
                        <div class="ingredients">
                           <h3>Ingredients:</h3>
                             <ul>
                                  ${data.ingredients.map(el=>`<li>${el}</li>`).join("\n")}
                           </ul>
                        </div>
                      </div>
                     <div class="description">
                       <h3>Preparation:</h3>
                         ${data.steps.map(el=>`<p>${el}</p>`).join("\n")}
                     </div>`
}