import { render, html, page } from "./renderer.js";
import { post } from "../data/api.js";
import { addUserData } from "../data/utils.js";

export function loadLogin() {
    let loadForm = () => html `
   <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onLogin}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>`
    render(loadForm());
}

async function onLogin(event) {
    event.preventDefault();
    const url = " http://localhost:3030/users/login";
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    if (!email || !password) {
        return alert("All fields required!");
    }
    let data = await post(url, { email, password });
    page.redirect("/catalog");
    addUserData(data);
    event.target.reset();
}