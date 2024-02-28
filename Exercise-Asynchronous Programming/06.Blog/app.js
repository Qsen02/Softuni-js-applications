function attachEvents() {
    const loadBtnRef = document.getElementById("btnLoadPosts");
    const selectRef = document.getElementById("posts");
    const viewBtn = document.getElementById("btnViewPost");
    const postTitleRef = document.getElementById("post-title");
    const postBodyRef = document.getElementById("post-body");
    const commentsRef = document.getElementById("post-comments");
    let dataFromServer;
    loadBtnRef.addEventListener("click", getPosts);
    viewBtn.addEventListener("click", getComments);

    async function getPosts() {
        const url = "http://localhost:3030/jsonstore/blog/posts";
        try {
            let res = await fetch(url);
            if (!res.ok) {
                throw new Error;
            }
            let data = await res.json();
            dataFromServer = data;
            console.log(data);
            selectRef.replaceChildren(...Object.values(data).map(el => createMenu(el)));
        } catch (error) {
            alert(error.message);
        }
    }

    async function getComments() {
        let url = `http://localhost:3030/jsonstore/blog/comments`;
        try {
            let res = await fetch(url);
            if (!res.ok) {
                throw new Error;
            }
            let data = await res.json();
            let dataArray = Object.values(data);
            let selectedPost = dataFromServer[selectRef.value];
            postTitleRef.textContent = selectedPost.title.toUpperCase();
            postBodyRef.textContent = selectedPost.body;
            let commentsCurPost = dataArray.filter(el => el.postId == selectRef.value);
            commentsRef.replaceChildren(...commentsCurPost.map(el => createElements(el)));
            selectRef.value = "";
        } catch (err) {
            alert(err.message);
        }
    }

    function createElements(data) {
        let liEl = document.createElement("li");
        liEl.textContent = data.text;
        liEl.id = data.id;
        return liEl;
    }

    function createMenu(data) {
        let optionEl = document.createElement("option");
        optionEl.value = data.id;
        optionEl.textContent = data.title.toUpperCase();
        return optionEl;
    }
}

attachEvents();