import { render, html, page } from "./renderer.js";
import { post } from "../data/api.js";
import { addUserData } from "../data/utils.js";

export function loadLoginForm() {
    let loadForm = () => html `
  <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onLogin} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="#">Create an account</a>
                </p>
            </form>
        </div>
    </section>`
    render(loadForm());
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    if (!email || !password) {
        return alert("All fileds required!");
    }
    const url = "http://localhost:3030/users/login";
    let data = await post(url, { email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/home");
}