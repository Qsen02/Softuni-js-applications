import { html, render } from "./nav.js";
import { post } from "./data/requester.js";
import { addUserData } from "./data/utils.js";
export function loadLogin() {
    let login = () => html `<div class="container home wrapper  my-md-5 pl-md-5">
<div class="row-form d-md-flex flex-mb-equal ">
    <div class="col-md-4">
        <img class="responsive" src="./images/idea.png" alt="">
    </div>
    <form class="form-user col-md-7" action="" method="" @submit=${onLogin}>
        <div class="text-center mb-4">
            <h1 class="h3 mb-3 font-weight-normal">Login</h1>
        </div>
        <div class="form-label-group">
            <label for="inputEmail">Email</label>
            <input type="text" id="inputEmail" name="email" class="form-control" placeholder="Email" required="" autofocus="">
        </div>
        <div class="form-label-group">
            <label for="inputPassword">Password</label>
            <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required="">
        </div>
        <div class="text-center mb-4 text-center">
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
            <p class="alreadyUser"> Don't have account? Then just
                <a href="">Sign-Up</a>!
            </p>
        </div>
        <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
    </form>
</div>
</div>`
    render(login);
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    const url = "http://localhost:3030/users/login";
    let data = await post(url, { email, password });
    if (!data) {
        return;
    }
    addUserData(data);
    event.target.reset();
    window.location = "/";
}