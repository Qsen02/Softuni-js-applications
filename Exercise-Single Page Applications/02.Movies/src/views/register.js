import { registration } from "../data/userService.js";
import { addUserData } from "../data/utils.js";
import { render, html, page } from "./render.js";

export function loadregisterForm() {
    let load = () => html `
    <section id="form-sign-up" class="view-section">
        <form @submit=${onRegister} id="register-form" class="text-center border border-light p-5" action="" method="">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
            </div>

            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input id="repeatPassword" type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="" />
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
        </form>
</section>`;
    render(load());
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    let rePass = formData.get("repeatPassword").trim();
    if (!email || !password || !rePass) {
        return alert("All fields required!");
    }
    if (password.length < 6) {
        return alert("Password must be at least 6 symbols long!");
    }
    if (password != rePass) {
        return alert("Password must match!");
    }
    let data = await registration({ email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/catalog");
}