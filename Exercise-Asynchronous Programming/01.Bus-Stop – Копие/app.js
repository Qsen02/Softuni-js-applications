function getInfo() {
    const inputRef = document.getElementById("stopId");
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputRef.value}`;
    const stopNameRef = document.getElementById("stopName");
    const busses = document.getElementById("buses");
    async function loadBuses() {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw "Error";
            }
            let data = await response.json();
            stopNameRef.textContent = data.name;
            let liElementsArr = createLiElements(data.buses);
            busses.replaceChildren(...liElementsArr);
            inputRef.value = "";
        } catch {
            stopNameRef.textContent = "Error";
        }
    }
    loadBuses();

    function createLiElements(data) {
        let result = [];
        for (let curData in data) {
            let liEl = document.createElement("li");
            liEl.textContent = `Bus ${curData} arrives in ${data[curData]} minutes`;
            result.push(liEl);
        }
        return result;
    }
}