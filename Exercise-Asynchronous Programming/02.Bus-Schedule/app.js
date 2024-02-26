function solve() {
    const departBtnRef = document.getElementById("depart");
    const arriveBtnREf = document.getElementById("arrive");
    const infoRef = document.getElementById("info");
    if (infoRef.textContent == "Not Connected") {
        arriveBtnREf.disabled = true;
    }

    function depart() {
        infoRef.children[0].remove();
        departBtnRef.disabled = true;
        arriveBtnREf.disabled = false;
        let spanEl = document.createElement("span");
        spanEl.classList.add("info");
        spanEl.textContent = "Next stop Depot";
        infoRef.appendChild(spanEl);
    }

    function arrive() {
        infoRef.children[0].remove();
        departBtnRef.disabled = false;
        arriveBtnREf.disabled = true;
        let spanEl = document.createElement("span");
        spanEl.classList.add("info");
        spanEl.textContent = "Arriving at Depot";
        infoRef.appendChild(spanEl);
    }

    return {
        depart,
        arrive
    };
}

let result = solve();