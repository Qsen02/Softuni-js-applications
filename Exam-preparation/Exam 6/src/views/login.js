import { logingIn } from "../data/userService.js";
import { page, html } from "./middlewear.js";
import { addUserData, error } from "../data/utils.js";

export function loadLoginForm(ctx) {
    let load = () => html `
   <section id="login">
        <form @submit=${onLogin} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>`;
    ctx.render(load());
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target)
    let email = formData.get("email");
    let password = formData.get("password");
    if (!email || !password) {
        error("All fields required!");
        return;
    }
    let data = await logingIn({ email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/catalog");
}