function updateTime() {
  let TehranElement = document.querySelector("#tehran");
  let TehranDateElement = TehranElement.querySelector("#date");
  let TehranTimeElement = TehranElement.querySelector("#time");
  let TehranTime = moment().tz("Asia/Tehran");

  TehranDateElement.innerHTML = TehranTime.format("MMMM Do YYYY");
  TehranTimeElement.innerHTML = TehranTime.format(
    "h:mm:ss [<small>]A[</small>]"
  );

  let LAElement = document.querySelector("#los-angeles");
  let LADateElement = LAElement.querySelector("#date");
  let LATimeElement = LAElement.querySelector("#time");
  let LATime = moment().tz("America/Los_Angeles");

  LADateElement.innerHTML = LATime.format("MMMM Do YYYY");
  LATimeElement.innerHTML = LATime.format("h:mm:ss [<small>]A[</small>]");
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
          <div>
            <h2>${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
          </div>
          <div class="time">${cityTime.format(
            "h:mm:ss [<small>]A[</small>]"
          )}</div>
        </div>`;
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
