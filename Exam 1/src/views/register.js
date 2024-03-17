import { render, html, page } from "./renderer.js";
import { post } from "../data/api.js";
import { addUserData } from "../data/utils.js";

export function loadRegisterForm() {
    let loadForm = () => html `
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
    </section>`
    render(loadForm());
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email").trim();
    let password = formData.get("password").trim();
    let rePass = formData.get("re-password").trim();
    if (!email || !password || !rePass) {
        return alert("All fileds required!");
    }
    if (password != rePass) {
        return alert("Password must match!");
    }
    const url = "http://localhost:3030/users/register";
    let data = await post(url, { email, password });
    addUserData(data);
    event.target.reset();
    page.redirect("/home");
}