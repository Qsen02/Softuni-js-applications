import { render, html, page } from "./renderer.js";
import {get, put } from "../data/api.js";

export async function editContent(ctx) {
    const id = ctx.params.id;
    const url = `http://localhost:3030/data/catalog/${id}`;
    let data = await get(url);
    let loadForm = (data) => html `
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form data-id=${data._id} data-ownerid=${data._onwerId} @submit=${onEdit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" value=${data.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model" value=${data.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${data.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" value=${data.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value=${data.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value=${data.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${data.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`
    render(loadForm(data));
}

async function onEdit(event) {
    event.preventDefault();
    let id = event.target.dataset.id;
    let onwerid = event.target.dataset.ownerid;
    const url = `http://localhost:3030/data/catalog/${id}`;
    let formData = new FormData(event.target);
    let make = formData.get("make");
    let model = formData.get("model");
    let year = Number(formData.get("year"));
    let description = formData.get("description");
    let price = Number(formData.get("price"));
    let img = formData.get("img");
    let material = formData.get("material");
    let isValid = true;
    if (make.length < 4) {
        document.getElementById("new-make").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("new-make").classList.remove("is-invalid");
        document.getElementById("new-make").classList.add("is-valid");
    }
    if (model.length < 4) {
        document.getElementById("new-model").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("new-model").classList.remove("is-invalid");
        document.getElementById("new-model").classList.add("is-valid");
    }
    if (year < 1950 || year > 2050) {
        document.getElementById("new-year").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("new-year").classList.remove("is-invalid");
        document.getElementById("new-year").classList.add("is-valid");
    }
    if (description.length <= 10) {
        document.getElementById("new-description").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("new-description").classList.remove("is-invalid");
        document.getElementById("new-description").classList.add("is-valid");
    }
    if (price < 0) {
        document.getElementById("new-price").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("new-price").classList.remove("is-invalid");
        document.getElementById("new-price").classList.add("is-valid");
    }
    if (!img) {
        document.getElementById("new-image").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("new-image").classList.remove("is-invalid");
        document.getElementById("new-image").classList.add("is-valid");
    }
    if (isValid) {
        await put(url, { make, model, year, description, price, img, material, _id: id, _ownerId: onwerid });
        event.target.reset();
        page.redirect("/catalog");
    }
}