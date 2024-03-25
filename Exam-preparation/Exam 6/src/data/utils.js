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
    let user = document.querySelector(".user");
    let guest = document.querySelector(".guest");
    if (userData) {
        user.style.display = "inline-block";
        user.children[1].children[0].textContent = `Welcome, ${userData.email}`;
        guest.style.display = "none";
    } else {
        user.style.display = "none";
        guest.style.display = "inline-block";
    }
}

export function error(message) {
    let messageRef = document.querySelector(".notification");
    messageRef.style.display = "inline-block";
    messageRef.children[0].textContent = message;
    setTimeout(() => messageRef.style.display = "none", 3000);
}