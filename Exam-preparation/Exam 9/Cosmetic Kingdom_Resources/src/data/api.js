import { getUserData, deleteUserData } from "./utils.js";

const host = "http://localhost:3030";

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
            if (res.status == 403) {
                deleteUserData();
            }
            const err = await res.json();
            throw new Error(err.message);
        }
        if (res.status == 204) {
            return res;
        }
        let data = await res.json();
        return data;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export async function get(url) {
    return request("get", host + url);
}

export async function post(url, data) {
    return request("post", host + url, data);
}

export async function del(url) {
    return request("delete", host + url);
}

export async function put(url, data) {
    return request("put", host + url, data);
}