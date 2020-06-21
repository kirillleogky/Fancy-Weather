import getUserLocation from "./utils/Location/getLocation";

let maps;

export default async function initMap() {
  /* eslint-disable */
  maps = new ymaps.Map("map", {
    center: [0, 0],
    zoom: 10,
  });
  const { loc } = await getUserLocation();
  const latitude = loc.split(",")[0];
  const longitude = loc.split(",")[1];

  maps.setCenter([latitude, longitude]);
}
/* eslint-enable */
