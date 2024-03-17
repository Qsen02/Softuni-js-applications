import { getUserData, deleteUserData } from "./utils.js";

async function request(method, url, data) {
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
            if (res.status == 403) {
                deleteUserData();
                return;
            }
            throw new Error(err.message);
        }
        if (res.status == 204) {
            deleteUserData();
            return;
        }
        let data = await res.json();
        return data;
    } catch (err) {
        alert(err.message);
        throw new Error(err.message);
    }
}

export async function get(url) {
    return request("get", url);
}

export async function post(url, data) {
    return request("post", url, data);
}

export async function del(url) {
    return request("delete", url);
}

export async function put(url, data) {
    return request("put", url, data);
}