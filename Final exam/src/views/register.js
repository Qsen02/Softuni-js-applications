import { registration } from "../data/userService.js";
import { addUserData, notify } from "../data/utils.js";
import { page, html } from "./middlewear.js";

export function loadRegisterForm(ctx) {
    let load = () => html `
 <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="register-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
</section>`;
    ctx.render(load());
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    let rePass = formData.get("re-password").trim();
    if (!email || !password || !rePass) {
        notify("All fields required!");
        return;
    }
    if (password != rePass) {
        notify("Passwords don't match");
        return;
    }
    let data = await registration({ email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/");
}