import { getProductById, getSalesForProduct, getUserSale } from "../data/dataService.js";
import { getUserData } from "../data/utils.js";
import { html } from "./middlewear.js";

export async function loadDetails(ctx) {
    const id = ctx.params.id;
    let data = await getProductById(id);
    let userData = getUserData();
    let sales = await getSalesForProduct(id);
    let isSale = 0;
    if (userData) {
        isSale = await getUserSale(id, userData._id);
    }
    let load = (data, sales, isSale) => html `
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
                Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-price">
                Price: <span id="price-number">${data.price}</span>$
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Bought: <span id="buys">${sales}</span> times.</h4>
                    <span>${data.description}</span>
      </div>
    </div>

    <div id="action-buttons">
    ${userData?
    html`${userData?._id==data._ownerId?
      html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
      <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
      :html`${isSale?null:html`<a href="/buy/${data._id}" id="buy-btn">Buy</a>`}`}`
    :null}
    </div>
   </div>
</section>`;
    ctx.render(load(data, sales, isSale));
}