export function addUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}
export function getUserData() {
    return JSON.parse(localStorage.getItem("user"));
}
export function deleteUserData() {
    localStorage.removeItem("user");
}

export function updateNav() {
    let userData = getUserData();
    let user = document.getElementById("user");
    let guest = document.getElementById("guest");
    if (userData) {
        user.style.display = "inline-block";
        guest.style.display = "none";
    } else {
        user.style.display = "none";
        guest.style.display = "inline-block";
    }
}