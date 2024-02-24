function loadRepos() {
    const content = document.getElementById("res");
    let url = "https://api.github.com/users/testnakov/repos";
    let httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener("readystatechange", function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            content.textContent = httpRequest.response;
        }
    });
    httpRequest.open("GET", url);
    httpRequest.send();
}