import { render, html, page } from "./renderer.js";
import { post } from "../data/api.js";
import { addUserData } from "../data/utils.js";

export function loadRegiter() {
    let loadForm = () => html `
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onRegister}>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>`
    render(loadForm());
}

async function onRegister(event) {
    event.preventDefault();
    const url = " http://localhost:3030/users/register";
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("rePass");
    if (!email || !password || !rePass) {
        return alert("All fields required!");
    }
    if (password != rePass) {
        return alert("Paasword must match!");
    }
    let data = await post(url, { email, password });
    page.redirect("/catalog");
    addUserData(data);
    event.target.reset();
}