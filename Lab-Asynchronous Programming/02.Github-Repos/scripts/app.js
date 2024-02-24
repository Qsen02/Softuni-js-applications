function loadRepos() {
    const username = document.getElementById("username");
    let url = `https://api.github.com/users/${username.value}/repos`;
    fetch(url)
        .then(takeData)
        .then(showData)
        .catch(onError);
}

function takeData(response) {
    if (!response.ok) {
        throw "Error";
    }
    return response.json();
}

function showData(data) {
    const repos = document.getElementById("repos");
    repos.replaceChildren(...data.map(({ html_url, full_name }) => createElements(html_url, full_name)));
}

function onError(error) {
    const repos = document.getElementById("repos");
    repos.textContent = error;
}

function createElements(url, name) {
    let liEl = document.createElement("li");
    let aEl = document.createElement("a");
    aEl.href = url;
    aEl.textContent = name;
    liEl.appendChild(aEl);
    return liEl;
}