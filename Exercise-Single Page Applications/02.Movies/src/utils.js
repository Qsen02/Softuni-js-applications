export function getUserData() {
    return JSON.parse(localStorage.getItem("user"));
}
export function addUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}
export function removeUserData() {
    localStorage.removeItem("user");
}