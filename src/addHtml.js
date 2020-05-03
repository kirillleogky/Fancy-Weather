export default function addHtml(objWords) {
  const htmlBody = document.querySelector('body');

  htmlBody.insertAdjacentHTML('afterbegin', '<div id="prldr"><div class="contpre"><label ></label><label></label><label></label><label></label><label></label><label></label></div></div><div class="wrapper"><header class="header_block" id="head"></header><main class="main_block" id="main"></main></div>');

  // Head
  const fragmentHeader = document.createDocumentFragment();

  const navigationMenuBlock = document.createElement('nav');
  navigationMenuBlock.classList.add('navigation_menu_block');
  navigationMenuBlock.innerHTML = `
   <button type="button" name="image button" class="navigation_menu_block-image_btn btn"></button>
   <div class="navigation_menu_block-dropdown">
     <button class="choose_btn btn"></button>
     <div id="myDropdown" class="language_buttons">
       <button type="button" name="eng language" class="eng_language_btn language_btn">Eng</button>
       <button type="button" name="rus language" class="rus_language_btn language_btn">Rus</button>
       <button type="button" name="bel language" class="bel_language_btn language_btn">Bel</button>
     </div>
   </div>
   <div class="temperature_units">
     <input type="checkbox" id="temperature_change"/>
     <label for="temperature_change" class="temp_change"></label>
   </div>`;

  const searchMenuBlock = document.createElement('div');
  searchMenuBlock.classList.add('search_menu_block');
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', `${objWords.searchBy}`);
  searchInput.classList.add('search_menu_block-input');
  searchMenuBlock.appendChild(searchInput);
  const searchSubmit = document.createElement('input');
  searchSubmit.setAttribute('type', 'submit');
  searchSubmit.setAttribute('value', `${objWords.search}`);
  searchSubmit.classList.add('search_menu_block-submit');
  searchSubmit.classList.add('btn');
  searchMenuBlock.appendChild(searchSubmit);

  fragmentHeader.appendChild(navigationMenuBlock);
  fragmentHeader.appendChild(searchMenuBlock);
  document.getElementById('head').appendChild(fragmentHeader);


  // Main
  function addFutureDay(weekDay, degrees, icon) {
    const day = document.createElement('div');
    day.classList.add('future_weather_block-day');
    day.innerHTML = `
      <p id=${weekDay} class='week_day'>Sunday</p>
      <p id=${degrees} class="degrees"></p>
      <i id=${icon}></i>`;
    return day;
  }

  const fragmentMain = document.createDocumentFragment();
  const infoBlock = document.createElement('div');
  infoBlock.classList.add('info_block');
  infoBlock.innerHTML = `
   <div class="info_block-local_data local_data_block">
    <p id="city"><span id="country">Belarus</span></p>
    <p id="date">Mon 28 October <span id="time">17:23</span></p>
   </div>
   <div class="info_block-degrees degrees_block">
    <p id="currDegrees"></p>
    <i id="currWeatherCondition"></i>
   <div class="degrees_block-curr_info curr_info_block">
    <ul>
      <li><span id="currWeatherType"></span></li>
      <li>${objWords.feels}: <span id="currWeatherFeels"></span></li>
      <li>${objWords.wind}: <span id="currWeatherWind"></span></li>
      <li>${objWords.humidity}: <span id="currWeatherHumidity"></span></li>
    </ul>
    </div>
   </div>`;

  const futureWeatherBlock = document.createElement('div');
  futureWeatherBlock.classList.add('future_weather_block');
  futureWeatherBlock.appendChild(addFutureDay('firstWeekDay', 'firstDegreesDay', 'firstIconDay'));
  futureWeatherBlock.appendChild(addFutureDay('secondWeekDay', 'secondDegreesDay', 'secondIconDay'));
  futureWeatherBlock.appendChild(addFutureDay('thirdWeekDay', 'thirdDegreesDay', 'thirdIconDay'));

  const mapBlock = document.createElement('div');
  mapBlock.classList.add('map_block');
  mapBlock.innerHTML = `
   <div class="map_block-map" id="map"></div>
   <p class="map_block-latitude">${objWords.latitude}<span id="latitude"></span></p>
   <p class="map_block-longitude">${objWords.longitude}<span id="longitude"></span></p>`;


  infoBlock.appendChild(futureWeatherBlock);
  fragmentMain.appendChild(infoBlock);
  fragmentMain.appendChild(mapBlock);
  document.getElementById('main').appendChild(fragmentMain);
}
