function lockedProfile() {
    const mainRef = document.getElementById("main");
    async function getProfiles() {
        try {
            const url = "http://localhost:3030/jsonstore/advanced/profiles";
            let response = await fetch(url);
            let data = await response.json();
            mainRef.children[0].remove();
            for (let id in data) {
                let divEl = createProfile(data[id]);
                mainRef.appendChild(divEl);
            }
            let curUsernames = document.querySelectorAll("#user1HiddenFields");
            curUsernames.forEach(el => el.style.display = "none");
            let butns = document.querySelectorAll("button");
            butns.forEach(el => el.addEventListener("click", showInfo));
            console.log(data);
        } catch (error) {
            alert("Error");
        }
    }

    function createProfile(data) {
        let divEl = document.createElement("div");
        divEl.classList.add("profile");
        divEl.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
                           <label>Lock</label>
                           <input type="radio" name="user1Locked" value="lock" checked>
                           <label>Unlock</label>
                           <input type="radio" name="user1Locked" value="unlock"><br>
                           <hr>
                           <label>Username</label>
                           <input type="text" name="user1Username" value=${data.username} disabled readonly />
                           <div id="user1HiddenFields">
                              <hr>
                              <label>Email:</label>
                              <input type="email" name="user1Email" value="${data.email}" disabled readonly />
                              <label>Age:</label>
                              <input type="text" name="user1Age" value="${data.age}" disabled readonly />
                           </div>
                           <button>Show more</button>`
        return divEl;
    }

    function showInfo(event) {
        let profileRef = event.target.parentElement;
        let radioLock = profileRef.children[2];
        let usernameRef = profileRef.children[9];
        if (!radioLock.checked) {
            if (event.target.textContent == "Show more") {
                usernameRef.style.display = "block";
                changeText(event.target);
            } else {
                usernameRef.style.display = "none";
                changeText(event.target);
            }
        }
    }

    function changeText(button) {
        button.textContent = button.textContent == "Show more" ? "Hide it" : "Show more";
    }
    getProfiles();
}