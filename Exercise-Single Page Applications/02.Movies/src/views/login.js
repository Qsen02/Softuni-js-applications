import { logingIn } from "../data/userService.js";
import { addUserData } from "../data/utils.js";
import { render, html, page } from "./render.js";

export function loadLoginForm() {
    let load = () => html `
   <section id="form-login" class="view-section">
        <form @submit=${onLogin} id="login-form" class="text-center border border-light p-5" action="" method="">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </section>`;
    render(load());
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    if (!email || !password) {
        return alert("All fields required!");
    }
    if (password.length < 6) {
        return alert("Password must be at least 6 symbols long!");
    }
    let data = await logingIn({ email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/catalog");
}