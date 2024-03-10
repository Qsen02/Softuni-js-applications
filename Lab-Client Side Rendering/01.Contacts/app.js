import { contacts } from "./contacts.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const allContacts = document.getElementById("contacts");

let template = (contacts) => html `
<div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>${contacts.name}</h2>
                <button class="detailsBtn" @click=${show}>Details</button>
                <div class="details" id=${contacts.id}>
                    <p>${contacts.phoneNumber}</p>
                    <p>${contacts.email}</p>
                </div>
            </div>
        </div>`;
render(contacts.map(el => template(el)), allContacts);

function show(event) {
    let details = event.target.parentElement.children[2];
    details.style.display = details.style.display == "block" ? "none" : "block";
}