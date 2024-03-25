import { registration } from "../data/userService.js";
import { addUserData } from "../data/utils.js";
import { html, page } from "./middlewear.js";

export function loadRegisterForm(ctx) {
    let load = () => html `
<section id="register-page" class="content auth">
        <form @submit=${onRegister} id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>`
    ctx.render(load());
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    let rePass = formData.get("confirm-password").trim();
    if (!email || !password || !rePass) {
        return alert("All fields required!");
    }
    if (password != rePass) {
        return alert("Password must match!");
    }
    let data = await registration({ email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/");
}