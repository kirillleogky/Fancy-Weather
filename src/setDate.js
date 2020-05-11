function deletePreDateInfo(elem) {
  elem.childNodes.forEach((n) => n.nodeType === document.TEXT_NODE && n.remove());
}

export default async function setDate(lang, date = new Date()) {
  const currDate = await date;
  const days = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    by: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'],
    ru: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
  };
  const months = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    by: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Травень', 'Чэрвень', 'Ліпень', 'Жнiвень', 'Верасень', 'Кастрычнiк', 'Лістапад', 'Снежань'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  };
  const dayOfTheWeek = days[`${lang}`][currDate.getDay()];
  const month = months[`${lang}`][currDate.getMonth()];
  const day = currDate.getDate();
  const currDateDom = document.getElementById('date');


  const firstFutureDay = (currDate.getDay() % 7) + 1;
  const secondFutureDay = (currDate.getDay() % 7) + 2;
  const thirdFutureDay = (currDate.getDay() % 7) + 3;

  const firstDayOfTheWeek = document.getElementById('firstWeekDay');
  const secondDayOfTheWeek = document.getElementById('secondWeekDay');
  const thirdDayOfTheWeek = document.getElementById('thirdWeekDay');
  firstDayOfTheWeek.textContent = days[`${lang}`][firstFutureDay];
  secondDayOfTheWeek.textContent = days[`${lang}`][secondFutureDay];
  thirdDayOfTheWeek.textContent = days[`${lang}`][thirdFutureDay];


  deletePreDateInfo(currDateDom);
  currDateDom.prepend(`${dayOfTheWeek} ${day} ${month} `);
}
