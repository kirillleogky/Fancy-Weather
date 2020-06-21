import { TRANSLATE_YANDEX } from "../staticData/constants";

async function getCurrentCity(text) {
  let lang = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_YANDEX}&text=${text}&lang=${localStorage.getItem(
      "language"
    )}`
  );
  lang = await lang.json();
  return lang.text[0];
}

function deletePreLocationInfo(elem) {
  elem.childNodes.forEach(
    (n) => n.nodeType === document.TEXT_NODE && n.remove()
  );
}

export default async function setLocation(location) {
  const { city, loc } = await location;
  const latitude = loc.split(",")[0];
  const longitude = loc.split(",")[1];
  const currCity = await getCurrentCity(city);

  deletePreLocationInfo(document.getElementById("city"));
  deletePreLocationInfo(document.getElementById("latitude"));
  deletePreLocationInfo(document.getElementById("longitude"));

  document.getElementById("city").prepend(`${currCity}, `);
  document.getElementById("latitude").prepend(latitude);
  document.getElementById("longitude").prepend(longitude);
}
