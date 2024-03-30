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
    const user = document.querySelector(".user");
    const guest = document.querySelector(".guest");
    if (userData) {
        user.style.display = "inline-block";
        guest.style.display = "none";
    } else {
        user.style.display = "none";
        guest.style.display = "inline-block";
    }
}

export function notify(message) {
    const notification = document.querySelector(".notification");
    let msg = document.querySelector(".msg");
    msg.textContent = message;
    notification.style.display = "block";
    setTimeout(() => notification.style.display = "none", 3000);
}