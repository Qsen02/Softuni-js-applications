import { logingIn } from "../data/userService.js";
import { addUserData, notify } from "../data/utils.js";
import { page, html } from "./middlewear.js";

export function loadLoginForm(ctx) {
    let load = () => html `
 <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onLogin} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                </p>
            </form>
        </div>
    </section>`;
    ctx.render(load());
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    if (!email || !password) {
        notify("All fields required!");
        return;
    }
    let data = await logingIn({ email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/");
}