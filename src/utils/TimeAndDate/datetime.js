import { days, months } from "../staticData/wordsData";
import { useGeocoding } from "../Location/location";
import { TIMEZONEDB_TOKEN } from "../staticData/constants";

function deletePreDateInfo(elem) {
  elem.childNodes.forEach(
    (n) => n.nodeType === document.TEXT_NODE && n.remove()
  );
}

// Get time and date of the searching city
async function getSearchingDate() {
  const { loc } = await useGeocoding();
  const latitude = loc.split(",")[0];
  const longitude = loc.split(",")[1];

  let timeObj = await fetch(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONEDB_TOKEN}&format=json&by=position&lat=${latitude}&lng=${longitude}`
  );
  timeObj = await timeObj.json();
  let { formatted } = await timeObj;
  formatted = formatted.split(" ");
  const year = formatted[0].slice(0, 4);
  const month = formatted[0].slice(5, 7);
  const date = formatted[0].slice(8, 10);
  const hours = formatted[1].slice(0, 2);
  const minutes = formatted[1].slice(3, 5);

  return new Date(year, month - 1, date, hours, minutes);
}

// Get time difference between current and searching city
async function getTimeDifference() {
  const currDateTime = await getSearchingDate();
  const pastDateTime = new Date();
  if (currDateTime > pastDateTime) {
    return currDateTime.getHours() - pastDateTime.getHours();
  }
  return pastDateTime.getHours() - currDateTime.getHours();
}

// Set Date
async function setDate(lang, date = new Date()) {
  const currDate = await date;

  const dayOfTheWeek = days[`${lang}`][currDate.getDay()];
  const month = months[`${lang}`][currDate.getMonth()];
  const day = currDate.getDate();
  const currDateDom = document.getElementById("date");

  const firstFutureDay = (currDate.getDay() + 1) % 7;
  const secondFutureDay = (currDate.getDay() + 2) % 7;
  const thirdFutureDay = (currDate.getDay() + 3) % 7;

  const firstDayOfTheWeek = document.getElementById("firstWeekDay");
  const secondDayOfTheWeek = document.getElementById("secondWeekDay");
  const thirdDayOfTheWeek = document.getElementById("thirdWeekDay");
  firstDayOfTheWeek.textContent = days[`${lang}`][firstFutureDay];
  secondDayOfTheWeek.textContent = days[`${lang}`][secondFutureDay];
  thirdDayOfTheWeek.textContent = days[`${lang}`][thirdFutureDay];

  deletePreDateInfo(currDateDom);
  currDateDom.prepend(`${dayOfTheWeek} ${day} ${month} `);
}

// Set time
async function setTime(date) {
  const time = document.querySelector("#time");
  const currDate = date();

  let hours = currDate.getHours();
  let minutes = currDate.getMinutes();

  if (hours <= 9) hours = `0${hours}`;
  if (minutes <= 9) minutes = `0${minutes}`;

  time.innerText = "";
  time.innerText = `${hours}:${minutes}`;
}

export { getSearchingDate, setDate, getTimeDifference, setTime };
