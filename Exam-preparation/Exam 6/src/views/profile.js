import { getUserMemes } from "../data/dataService.js";
import { html } from "./middlewear.js";
import { getUserData } from "../data/utils.js";

export async function loadProfile(ctx) {
    let userData = getUserData();
    let data = await getUserMemes(userData._id);
    console.log(data);
    let load = (data, userData) => html `
     <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
            <div class="user-content">
                <p>Username: ${userData.username}</p>
                <p>Email: ${userData.email}</p>
                <p>My memes count: ${data.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
${data.length>0?
            html`${data.map(el=>html`
            <div class="user-meme">
                <p class="user-meme-title">${el.title}</p>
                <img class="userProfileImage" alt="meme-img" src=${el.imageUrl}>
                <a class="button" href="/catalog/${el._id}">Details</a>
            </div>`)}`
           :html`<p class="no-memes">No memes in database.</p>`
}
        </div>
    </section>`;
    ctx.render(load(data,userData));
}