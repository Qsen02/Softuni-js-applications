import { request } from "./data/requester.js";
import { loadDashboard } from "./dashboard.js";
export function onDelete(event) {
    let id = event.target.dataset.id;
    deleting(id);
}

async function deleting(id) {
    const url = `http://localhost:3030/data/ideas/${id}`;
    await request("DELETE", url);
    loadDashboard();
}