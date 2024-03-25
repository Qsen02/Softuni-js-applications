import { registration } from "../data/userService.js";
import { page, html } from "./middlewear.js";
import { addUserData } from "../data/utils.js";
import { error } from "../data/utils.js";

export function loadRegisterForm(ctx) {
    let load = () => html `
 <section id="register">
        <form @submit=${onRegister} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`;
    ctx.render(load());
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target)
    let username = formData.get("username");
    let email = formData.get("email");
    let password = formData.get("password");
    let repeatPass = formData.get("repeatPass");
    let gender = formData.get("gender");
    if (!username || !email || !password || !repeatPass || !gender) {
        error("All fields required!");
        return;
    }
    if (password != repeatPass) {
        error("Password must match!");
        return;
    }
    let data = await registration({ username, email, password, gender });
    addUserData(data);
    event.target.reset();
    page.redirect("/catalog");
}