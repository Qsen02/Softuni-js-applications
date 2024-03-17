import { post } from "../data/api.js";
import { addUserData } from "../data/utils.js";
import { render, html, page } from "./renderer.js";

export function loadLoginForm() {
    let load = () => html `
  <section id="login">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Login</h2>
            <form @submit=${onLogin} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="#">Create an account</a>
                </p>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>`;
    render(load());
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    if (!email || !password) {
        return alert("All fields are required!");
    }
    const url = "http://localhost:3030/users/login";
    let data = await post(url, { email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/home");
}