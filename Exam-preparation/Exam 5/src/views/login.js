import { logingIn } from "../data/userService.js";
import { addUserData } from "../data/utils.js";
import { html, page } from "./middlewear.js";

export function loadLoginForm(ctx) {
    let load = () => html `
 <section id="login-page" class="auth">
        <form @submit=${onLogin} id="login">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </div>
        </form>
    </section>`
    ctx.render(load());
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    if (!email || !password) {
        return alert("All fields required!");
    }
    let data = await logingIn({ email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/");
}