import { IPINFO_TOKEN, IPSTACK_TOKEN } from './constants';

export default async function getUserLocation() {
  let responseIp = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
  responseIp = await responseIp.json();

  let response = await fetch(`http://api.ipstack.com/${responseIp.ip}?access_key=${IPSTACK_TOKEN}`);
  response = await response.json();

  const lat = response.latitude.toFixed(4);
  const long = response.longitude.toFixed(4);
  return {
    city: `${response.city}`,
    loc: `${lat},${long}`,
    country: `${response.country_code}`,
  };
}
