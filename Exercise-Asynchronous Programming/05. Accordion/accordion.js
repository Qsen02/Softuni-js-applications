window.addEventListener("load", solution);

function solution() {
    const url = "http://localhost:3030/jsonstore/advanced/articles/list";
    const mainRef = document.getElementById("main");
    async function getData() {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        createArticles(data);
    }

    function createArticles(data) {
        for (let curData of data) {
            let divEl = document.createElement("div");
            divEl.classList.add("accordion");
            let divEl1 = document.createElement("div");
            divEl1.classList.add("head");
            let spanEl = document.createElement("span");
            spanEl.textContent = curData.title;
            divEl1.appendChild(spanEl);
            let btnEl = document.createElement("button");
            btnEl.classList.add("button");
            btnEl.id = curData._id;
            btnEl.textContent = "More";
            btnEl.addEventListener("click", (event) => {
                if (event.target.textContent == "More") {
                    showMoreInfo(event.target.id, event.target);
                    changeText(event.target);
                } else {
                    let divRef = event.target.parentElement.parentElement;
                    let newDiv = divRef.children[1];
                    newDiv.remove();
                    changeText(event.target);
                }
            });
            divEl1.appendChild(btnEl);
            divEl.appendChild(divEl1);
            mainRef.appendChild(divEl);
        }
    }

    function changeText(btn) {
        btn.textContent = btn.textContent == "More" ? "Less" : "More";
    }
    async function showMoreInfo(id, eventTarget) {
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        let response = await fetch(url);
        let data = await response.json();
        let content = `${data.content}`;
        let div = createContent(content);
        let divRef = eventTarget.parentElement.parentElement;
        divRef.appendChild(div);
    }

    function createContent(content) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("extra");
        let p = document.createElement("p");
        p.textContent = content;
        newDiv.appendChild(p);
        newDiv.style.display = "block";
        return newDiv;
    }
    getData();
}