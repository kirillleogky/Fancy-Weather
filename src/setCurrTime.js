export default async function setTime(date) {
  const time = document.querySelector('#time');
  const currDate = date();

  let hours = currDate.getHours();
  let minutes = currDate.getMinutes();

  if (hours <= 9) hours = `0${hours}`;
  if (minutes <= 9) minutes = `0${minutes}`;

  time.innerText = '';
  time.innerText = `${hours}:${minutes}`;
}
