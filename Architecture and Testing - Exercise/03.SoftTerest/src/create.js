import { html, render, page } from "./nav.js";
import { post } from "./data/requester.js"
export function createIdea() {
    let creating = () => html `
<div class="container home wrapper  my-md-5 pl-md-5">
            <div class=" d-md-flex flex-mb-equal ">
                <div class="col-md-6">
                    <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
                </div>
                <form class="form-idea col-md-5" action="#/create" method="post" @submit=${onCreate}>
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
                    </div>
                    <div class="form-label-group">
                        <label for="ideaTitle">Title</label>
                        <input type="text" id="ideaTitle" name="title" class="form-control" placeholder="What is your idea?" required="" autofocus="">
                    </div>
                    <div class="form-label-group">
                        <label for="ideaDescription">Description</label>
                        <textarea type="text" name="description" class="form-control" placeholder="Description" required=""></textarea>
                    </div>
                    <div class="form-label-group">
                        <label for="inputURL">Add Image</label>
                        <input type="text" id="inputURL" name="imageURL" class="form-control" placeholder="Image URL" required="">

                    </div>
                    <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

                    <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
                </form>
            </div>
        </div>`
    render(creating);
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let img = formData.get("imageURL");
    const url = "http://localhost:3030/data/ideas";
    if (title.length < 6) {
        alert("Title must be at leasr 6 characters!");
        return;
    }
    if (description.length < 10) {
        alert("Description must be at least 10 characters!");
        return;
    }
    if (img.length < 5) {
        alert("Image must be at least 5 characters!");
        return;
    }
    await post(url, { title, description, img });
    page.redirect("/dashboard");
}