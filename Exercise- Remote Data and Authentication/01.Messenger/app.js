function attachEvents() {
    const messagesRef = document.getElementById("messages");
    const authorRef = document.querySelector("input[name='author']");
    const contentRef = document.querySelector("input[name='content']");
    const sendBtnRef = document.getElementById("submit");
    const url = "http://localhost:3030/jsonstore/messenger";
    const refreshBtnRef = document.getElementById("refresh");
    refreshBtnRef.addEventListener("click", loadMsgs);
    sendBtnRef.addEventListener("click", sendMsg);
    async function sendMsg() {
        let content = contentRef.value;
        let author = authorRef.value;
        if (!content || !author) {
            return;
        }
        try {
            let res = await fetch(url, {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ author, content })
            })
            if (!res.ok) {
                throw new Error;
            }
            authorRef.value = "";
            contentRef.value = "";
        } catch (err) {
            alert(err.message);
        }
    }
    async function loadMsgs() {
        messagesRef.value = "";
        try {
            let res = await fetch(url);
            if (!res.ok) {
                throw new Error;
            }
            let data = await res.json();
            console.log(data);
            let content = Object.values(data);
            let text = "";
            for (let data of content) {
                text += `${data.author}: ${data.content}\n`;
            }
            messagesRef.value = text.trim();
        } catch (err) {
            alert(err.message);
        }
    }
}
attachEvents();