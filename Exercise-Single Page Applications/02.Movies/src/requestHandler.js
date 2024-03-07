import { getUserData, removeUserData } from "./utils.js"
export async function request(method, url, data) {
    let userData = getUserData();
    let options = {
        method: method,
        headers: {}
    }
    if (userData) {
        options.headers["Content-type"] = "application/json";
        options.headers["X-Authorization"] = userData.accessToken;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        let res = await fetch(url, options);
        if (!res.ok) {
            const err = await res.json();
            if (userData && res.code == 403) {
                removeUserData();
            }
            throw new Error(err.message);
        }
        let result = await res.json()
        return result;
    } catch (err) {
        alert(err.message);
    }
}