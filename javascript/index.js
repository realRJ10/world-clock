// Update fixed cities' times
function updateTime() {
  function updateCityTime(cityId, timeZone) {
    const element = document.querySelector(`#${cityId}`);
    const dateElement = element.querySelector(".date");
    const timeElement = element.querySelector(".time");
    const time = moment().tz(timeZone);

    dateElement.innerHTML = time.format("MMMM Do YYYY");
    timeElement.innerHTML = time.format("h:mm:ss [<small>]A[</small>]");
  }

  updateCityTime("tehran", "Asia/Tehran");
  updateCityTime("los-angeles", "America/Los_Angeles");
  updateCityTime("tokyo", "Asia/Tokyo");
  updateCityTime("paris", "Europe/Paris");
}

let updateInterval;

function updateCity(event) {
  if (updateInterval) clearInterval(updateInterval);

  const cityTimeZone = event.target.value;
  const cityName = cityTimeZone.split("/")[1].replace("_", " ");
  const displayElement = document.querySelector("#cities");

  function updateDisplay() {
    const time = moment().tz(cityTimeZone);
    displayElement.innerHTML = `
      <div class="city">
        <div>
          <h2>${cityName}</h2>
          <div class="date">${time.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${time.format("h:mm:ss [<small>]A[</small>]")}</div>
      </div>`;
  }

  updateDisplay();
  updateInterval = setInterval(updateDisplay, 1000);
}

updateTime();
setInterval(updateTime, 1000);
document.querySelector("#city").addEventListener("change", updateCity);
