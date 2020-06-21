import { TIMEZONEDB_TOKEN } from "../staticData/constants";

export default async function getSearchingDate(location) {
  const { loc } = await location;
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
