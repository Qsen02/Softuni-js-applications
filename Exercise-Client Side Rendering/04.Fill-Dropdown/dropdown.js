import { render, html } from "./node_modules/lit-html/lit-html.js"

addItem();

function addItem() {
    const url = "http://localhost:3030/jsonstore/advanced/dropdown";
    const root = document.getElementById("menu");
    const inputs = document.querySelectorAll("input");
    inputs[1].addEventListener("click", addNewItem);
    getData();

    async function getData() {
        try {
            let res = await fetch(url);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            let data = await res.json();
            console.log(data);
            let items = Object.values(data);
            let curItmes = (items) => html `${items.map(el=>html`<option value=${el._id}>${el.text}</option>`)}`;
            render(curItmes(items),root);
        } catch (err) {
            alert(err.message);
        }
    }
    async function addNewItem(event){
      event.preventDefault();
      let text=inputs[0].value;
      try {
        let res = await fetch(url,{
            method:"post",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({text})
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        inputs[0].value="";
        await getData();
    } catch (err) {
        alert(err.message);
    }
   }
}