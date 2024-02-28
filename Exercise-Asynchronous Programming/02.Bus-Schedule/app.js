function solve() {
    const departBtnRef = document.getElementById("depart");
    const arriveBtnREf = document.getElementById("arrive");
    const infoRef = document.querySelector(".info");
    let stopId = "depot";
    let curStop;
    let url = `http://localhost:3030/jsonstore/bus/schedule/`;
    async function depart() {
        try {
            let res = await fetch(url + stopId);
            if (!res.ok) {
                throw new Error;
            }
            let data = await res.json();
            departBtnRef.disabled = true;
            arriveBtnREf.disabled = false;
            curStop = data.name;
            infoRef.textContent = `Next stop ${curStop}`;
        } catch (err) {
            infoRef.textContent = "Error";
            departBtnRef.disabled = true;
            arriveBtnREf.disabled = true;
        }
    }

    async function arrive() {
        try {
            infoRef.textContent = `Arriving at ${curStop}`;
            let res = await fetch(url + stopId);
            if (!res.ok) {
                throw new Error;
            }
            let data = await res.json();
            stopId = data.next;
            departBtnRef.disabled = false;
            arriveBtnREf.disabled = true;
        } catch (err) {
            infoRef.textContent = "Error";
            departBtnRef.disabled = true;
            arriveBtnREf.disabled = true;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();