export default function addHtml(objWords) {
  const htmlBody = document.querySelector("body");

  function addPreLoad() {
    const preload = document.createElement("div");
    preload.id = "prldr";
    const contpre = document.createElement("div");
    contpre.className = "contpre";
    for (let i = 0; i < 6; i += 1) {
      contpre.append(document.createElement("label"));
    }
    preload.append(contpre);
    return preload;
  }
  function addWrapper() {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const header = document.createElement("header");
    header.className = "header_block";
    header.id = "head";
    const main = document.createElement("main");
    main.className = "main_block";
    main.id = "main";
    wrapper.append(header);
    wrapper.append(main);

    return wrapper;
  }
  htmlBody.prepend(addWrapper());
  htmlBody.prepend(addPreLoad());

  function createButton(type, name, firstClass, secondClass, text = "") {
    const btn = document.createElement("button");
    btn.setAttribute("type", type);
    btn.setAttribute("name", name);
    btn.prepend(text);
    btn.classList.add(`${firstClass}`, `${secondClass}`);
    return btn;
  }

  // Head
  const fragmentHeader = document.createDocumentFragment();

  const navigationMenuBlock = document.createElement("nav");
  navigationMenuBlock.classList.add("navigation_menu_block");
  navigationMenuBlock.prepend(
    createButton(
      "button",
      "image button",
      "navigation_menu_block-image_btn",
      "btn"
    )
  );
  const dropdown = document.createElement("div");
  dropdown.className = "navigation_menu_block-dropdown";
  const languageBtns = document.createElement("div");
  languageBtns.id = "myDropdown";
  languageBtns.className = "language_buttons";
  languageBtns.prepend(
    createButton(
      "button",
      "bel language",
      "bel_language_btn",
      "language_btn",
      "Bel"
    )
  );
  languageBtns.prepend(
    createButton(
      "button",
      "rus language",
      "rus_language_btn",
      "language_btn",
      "Rus"
    )
  );
  languageBtns.prepend(
    createButton(
      "button",
      "eng language",
      "eng_language_btn",
      "language_btn",
      "Eng"
    )
  );

  dropdown.prepend(createButton("", "", "choose_btn", "btn"));
  dropdown.append(languageBtns);
  navigationMenuBlock.append(dropdown);

  const temperature = document.createElement("div");
  temperature.className = "temperature_units";
  const temperatureInput = document.createElement("input");
  temperatureInput.setAttribute("type", "checkbox");
  temperatureInput.id = "temperature_change";
  const temperatureLabel = document.createElement("label");
  temperatureLabel.setAttribute("for", "temperature_change");
  temperatureLabel.className = "temp_change";
  temperature.prepend(temperatureInput);
  temperature.append(temperatureLabel);

  navigationMenuBlock.append(temperature);

  const searchMenuBlock = document.createElement("div");
  searchMenuBlock.classList.add("search_menu_block");
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", `${objWords.searchBy}`);
  searchInput.classList.add("search_menu_block-input");
  searchMenuBlock.appendChild(searchInput);
  const searchSubmit = document.createElement("input");
  searchSubmit.setAttribute("type", "submit");
  searchSubmit.setAttribute("value", `${objWords.search}`);
  searchSubmit.classList.add("search_menu_block-submit");
  searchSubmit.classList.add("btn");
  searchMenuBlock.appendChild(searchSubmit);

  fragmentHeader.appendChild(navigationMenuBlock);
  fragmentHeader.appendChild(searchMenuBlock);
  document.getElementById("head").appendChild(fragmentHeader);

  // Main
  function addFutureDay(weekDay, degrees, icon) {
    const day = document.createElement("div");
    day.classList.add("future_weather_block-day");

    const dayOfTheWeek = document.createElement("p");
    dayOfTheWeek.id = `${weekDay}`;
    dayOfTheWeek.className = "week_day";
    dayOfTheWeek.prepend("Sunday");
    const degreesOfTheWeather = document.createElement("p");
    degreesOfTheWeather.id = `${degrees}`;
    degreesOfTheWeather.className = "degrees";
    const iconOfTheWeather = document.createElement("i");
    iconOfTheWeather.id = `${icon}`;

    day.prepend(dayOfTheWeek);
    day.prepend(degreesOfTheWeather);
    day.prepend(iconOfTheWeather);

    return day;
  }

  function addDataField(id, text = "") {
    const field = document.createElement("span");
    field.id = `${id}`;
    field.prepend(`${text}`);
    return field;
  }

  const fragmentMain = document.createDocumentFragment();

  // Info Block
  const infoBlock = document.createElement("div");
  infoBlock.classList.add("info_block");

  const cityAndDate = document.createElement("div");
  cityAndDate.classList.add("info_block-local_data", "local_data_block");
  const city = document.createElement("p");
  city.id = "city";
  city.append(addDataField("country", ""));
  const date = document.createElement("p");
  date.id = "date";
  date.append(addDataField("time", "00:00"));
  cityAndDate.append(city);
  cityAndDate.append(date);

  const degrees = document.createElement("div");
  degrees.classList.add("info_block-degrees", "degrees_block");
  const currentDegrees = document.createElement("p");
  currentDegrees.id = "currDegrees";
  const currentWeatherCondition = document.createElement("i");
  currentWeatherCondition.id = "currWeatherCondition";

  const weatherType = document.createElement("div");
  weatherType.classList.add("degrees_block-curr_info", "curr_info_block");
  const weatherTypeList = document.createElement("ul");
  const currentWeatherType = document.createElement("li");
  currentWeatherType.append(addDataField("currWeatherType"));
  weatherTypeList.append(currentWeatherType);
  const currentWeatherFeels = document.createElement("li");
  currentWeatherFeels.append(`${objWords.feels}: `);
  currentWeatherFeels.append(addDataField("currWeatherFeels"));
  weatherTypeList.append(currentWeatherFeels);
  const currentWeatherWind = document.createElement("li");
  currentWeatherWind.append(`${objWords.wind}: `);
  currentWeatherWind.append(addDataField("currWeatherWind"));
  weatherTypeList.append(currentWeatherWind);
  const currentWeatherHumidity = document.createElement("li");
  currentWeatherHumidity.append(`${objWords.humidity}: `);
  currentWeatherHumidity.append(addDataField("currWeatherHumidity"));
  weatherTypeList.append(currentWeatherHumidity);
  weatherType.append(weatherTypeList);

  degrees.append(currentDegrees);
  degrees.append(currentWeatherCondition);
  degrees.append(weatherType);
  infoBlock.append(cityAndDate);
  infoBlock.append(degrees);

  const futureWeatherBlock = document.createElement("div");
  futureWeatherBlock.classList.add("future_weather_block");
  futureWeatherBlock.appendChild(
    addFutureDay("firstWeekDay", "firstDegreesDay", "firstIconDay")
  );
  futureWeatherBlock.appendChild(
    addFutureDay("secondWeekDay", "secondDegreesDay", "secondIconDay")
  );
  futureWeatherBlock.appendChild(
    addFutureDay("thirdWeekDay", "thirdDegreesDay", "thirdIconDay")
  );

  // Map Block
  const mapBlock = document.createElement("div");
  mapBlock.classList.add("map_block");

  const map = document.createElement("div");
  map.id = "map";
  map.className = "map_block-map";
  const latitude = document.createElement("p");
  latitude.className = "map_block-latitude";
  latitude.append(`${objWords.latitude}`);
  latitude.append(addDataField("latitude"));
  const longitude = document.createElement("p");
  longitude.className = "map_block-longitude";
  longitude.append(`${objWords.longitude}`);
  longitude.append(addDataField("longitude"));

  mapBlock.append(map);
  mapBlock.append(latitude);
  mapBlock.append(longitude);

  infoBlock.appendChild(futureWeatherBlock);
  fragmentMain.appendChild(infoBlock);
  fragmentMain.appendChild(mapBlock);
  document.getElementById("main").appendChild(fragmentMain);
}
