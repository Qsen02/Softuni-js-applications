window.addEventListener("load", start)

function start() {
    document.querySelector("form").addEventListener("submit", logUser);

    async function logUser(event) {
        event.preventDefault();
        const url = "http://localhost:3030/users/login";
        let formRef = new FormData(event.target);
        let data = Object.fromEntries(formRef.entries());
        let email = data.email.trim();
        let password = data.password.trim();
        console.log(data);
        try {
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