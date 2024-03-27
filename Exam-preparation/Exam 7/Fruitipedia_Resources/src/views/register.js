import { page, html } from "./middlewear.js";
import { registration } from "../data/userService.js";
import { addUserData } from "../data/utils.js";

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
                <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
        </div>
    </section>`;
    ctx.render(load());
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("re-password");
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