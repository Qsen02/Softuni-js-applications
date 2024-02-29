window.addEventListener("load", start)

function start() {
    document.querySelector("form").addEventListener("submit", addUser);

    async function addUser(event) {
        event.preventDefault();
        const url = "http://localhost:3030/users/register";
        let formRef = new FormData(event.target);
        let data = Object.fromEntries(formRef.entries());
        let email = data.email.trim();
        let password = data.password.trim();
        let rePass = data.rePass.trim();
        try {
            if (!email || !password) {
                throw new Error("All fields required!");
            }
            if (password.length < 6) {
                throw new Error("Password must be 6 symbols or above!");
            }
            if (password != rePass) {
                throw new Error("Password must match!");
            }
            let res = await fetch(url, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            let userData = await res.json();
            sessionStorage.setItem("user", JSON.stringify(userData));
            window.location = "/";
        } catch (err) {
            alert(err.message);
        }
    }
}