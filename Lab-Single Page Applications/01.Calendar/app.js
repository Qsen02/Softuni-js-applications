const monthCalendars = document.querySelectorAll(".monthCalendar");
monthCalendars.forEach(el => el.style.display = "none");
const dayCalendars = document.querySelectorAll(".daysCalendar");
dayCalendars.forEach(el => el.style.display = "none");
const years = document.querySelectorAll(".yearsCalendar .day");
const yearCalendar = document.getElementById("years");
years.forEach(el => el.addEventListener("click", displayMonts));
const months = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sept: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December"
}

function displayMonts(event) {
    let curYear = event.target.children[0].textContent;
    let captions = document.querySelectorAll(".monthCalendar caption");
    let curMonthCalendar = Array.from(captions).find(el => el.textContent == curYear);
    if (curMonthCalendar) {
        curMonthCalendar.parentElement.parentElement.style.display = "block";
        yearCalendar.style.display = "none";
        curMonthCalendar.addEventListener("click", returnYearList);
        let months = document.querySelectorAll(".monthCalendar .day");
        months.forEach(el => el.addEventListener("click", displayDays));
    }
}

function returnYearList(event) {
    event.target.parentElement.parentElement.style.display = "none";
    yearCalendar.style.display = "block";
}

function displayDays(event) {
    let curMonth = event.target.children[0].textContent;
    let curYear = event.target.parentElement.parentElement.parentElement.children[0].textContent;
    let captions = document.querySelectorAll(".daysCalendar caption");
    let curDayCalendar = Array.from(captions).find(el => el.textContent == `${months[curMonth]} ${curYear}`);
    if (curDayCalendar) {
        curDayCalendar.parentElement.parentElement.style.display = "block";
        event.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        curDayCalendar.addEventListener("click", returnMonthList);
    }
}

function returnMonthList(event) {
    event.target.parentElement.parentElement.style.display = "none";
    let [month, year] = event.target.textContent.split(" ");
    let monthCaptions = document.querySelectorAll(".monthCalendar caption");
    let curMonthCalendar = Array.from(monthCaptions).find(el => el.textContent == year);
    curMonthCalendar.parentElement.parentElement.style.display = "block";
}