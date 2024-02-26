function attachEvents() {
    const inputRef = document.getElementById("location");
    const submitBtnRef = document.getElementById("submit");
    const forecastSectionRef = document.getElementById("forecast");
    const currentDivRef = document.getElementById("current");
    const upcamingDivRef = document.getElementById("upcoming");
    const htmlEntities = {
        Sunny: "&#x2600;",
        "Partly sunny": "&#x26C5;",
        Overcast: "&#x2601;",
        Rain: "&#x2614;",
        Degrees: "&#176;"
    }
    submitBtnRef.addEventListener("click", loadData);

    async function loadData() {
        try {
            const url = "http://localhost:3030/jsonstore/forecaster/locations";
            let response = await fetch(url);
            let data = await response.json();
            let { code, name } = data.find(el => el.name == inputRef.value);
            forecastSectionRef.style.display = "block";
            await getTodaysData(code);
            await getThreeDaysData(code);
        } catch {
            forecastSectionRef.style.display = "block";
            forecastSectionRef.textContent = "Error";
        }
    }
    async function getTodaysData(code) {
        try {
            let url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
            let response = await fetch(url);
            let data = await response.json();
            createStructure(data);
        } catch {
            forecastSectionRef.style.display = "block";
            forecastSectionRef.textContent = "Error";
        }
    }
    async function getThreeDaysData(code) {
        try {
            let url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
            let response = await fetch(url);
            let data = await response.json();
            createStructure1(data);
        } catch {
            forecastSectionRef.style.display = "block";
            forecastSectionRef.textContent = "Error";
        }
    }

    function createStructure(data) {
        if (forecastSectionRef.textContent == "Error") {
            forecastSectionRef.textContent = "";
            forecastSectionRef.appendChild(currentDivRef);
            forecastSectionRef.appendChild(upcamingDivRef);
        }
        currentDivRef.innerHTML = `
        <div class="label">Current conditions</div>
        <div class="forecasts">
        <span class="condition symbol">${htmlEntities[data.forecast.condition]}</span>
        <span class="condition">
         <span class="forecast-data">${data.name}</span>
         <span class="forecast-data">${data.forecast.low}${htmlEntities.Degrees}/${data.forecast.high}${htmlEntities.Degrees}</span>
         <span class="forecast-data">${data.forecast.condition}</span>
        </span>
        </div>
        `
    }

    function createStructure1(data) {
        upcamingDivRef.innerHTML = `
        <div class="label">Three-day forecast</div>
        <div class="forecast-info">
        <span class="upcoming">
         <span class="symbol">${htmlEntities[data.forecast[0].condition]}</span>
         <span class="forecast-data">${data.forecast[0].low}${htmlEntities.Degrees}/${data.forecast[0].high}${htmlEntities.Degrees}</span>
         <span class="forecast-data">${data.forecast[0].condition}</span>
        </span>
        <span class="upcoming">
         <span class="symbol">${htmlEntities[data.forecast[1].condition]}</span>
         <span class="forecast-data">${data.forecast[1].low}${htmlEntities.Degrees}/${data.forecast[1].high}${htmlEntities.Degrees}</span>
         <span class="forecast-data">${data.forecast[1].condition}</span>
       </span>
       <span class="upcoming">
        <span class="symbol">${htmlEntities[data.forecast[2].condition]}</span>
        <span class="forecast-data">${data.forecast[2].low}${htmlEntities.Degrees}/${data.forecast[2].high}${htmlEntities.Degrees}</span>
        <span class="forecast-data">${data.forecast[2].condition}</span>
      </span>
      </div>
        `;
    }
}

attachEvents();