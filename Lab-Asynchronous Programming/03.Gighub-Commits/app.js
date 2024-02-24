function loadCommits() {
    const username = document.getElementById("username");
    const repos = document.getElementById("repo")
    let url = `https://api.github.com/repos/${username.value}/${repos.value}/commits`;
    fetch(url)
        .then(takeData)
        .then(showData)
        .catch(onError);
}

function takeData(response) {
    if (!response.ok) {
        throw `${response.status}`;
    }
    return response.json();
}

function showData(data) {
    const commitsRef = document.getElementById("commits");
    commitsRef.replaceChildren(...data.map(el => createElements(el)));
}

function onError(error) {
    const commitsRef = document.getElementById("commits");
    let liEl = document.createElement("li");
    liEl.textContent = `Error: ${error} (Not Found)`;
    commitsRef.appendChild(liEl);
}

function createElements(el) {
    let liEl = document.createElement("li");
    liEl.textContent = `${el.commit.author.name}: ${el.commit.message}`;
    return liEl;
}