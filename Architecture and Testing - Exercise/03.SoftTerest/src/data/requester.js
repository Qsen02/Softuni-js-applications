import { getUserData, deleteUserData } from "./utils.js";

export async function request(method, url, data) {
    let options = {
        method: method,
        headers: {}
    }
    let userData = getUserData();
    if (userData) {
        options.headers["Content-type"] = "application/json";
        options.headers["X-Authorization"] = userData.accessToken;
    } else {
        options.headers["Content-type"] = "application/json";
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        let res = await fetch(url, options);
        if (!res.ok) {
            const err = await res.json();
            if (res.code == 403) {
                deleteUserData();
            }
            throw new Error(err.message);
        }
        let data = await res.json();
        return data;
    } catch (err) {
        alert(err.message);
    }
}