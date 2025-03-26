// Store original cities HTML and hide back link initially
const originalCitiesHTML = document.querySelector("#cities").innerHTML;
document.querySelector(".back-link").style.display = "none";

const localTimeZone = moment.tz.guess();

// Update current location text
document.querySelector(
  '#city option[value="local"]'
).textContent = `Current location (${localTimeZone
  .split("/")
  .pop()
  .replace("_", " ")})`;

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

  // Show back link
  document.querySelector(".back-link").style.display = "block";

  const selectedValue = event.target.value;
  const cityTimeZone =
    selectedValue === "local" ? localTimeZone : selectedValue;

  const cityName =
    selectedValue === "local"
      ? `Current Location (${localTimeZone.split("/").pop().replace("_", " ")})`
      : cityTimeZone.split("/")[1].replace("_", " ");

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

// Back link functionality
document.querySelector(".back-link").addEventListener("click", function (e) {
  e.preventDefault();
  if (updateInterval) clearInterval(updateInterval);
  document.querySelector("#cities").innerHTML = originalCitiesHTML;
  document.querySelector("#city").value = "";
  document.querySelector(".back-link").style.display = "none";
  updateTime();
  setInterval(updateTime, 1000);
});

// Initial setup
updateTime();
setInterval(updateTime, 1000);
document.querySelector("#city").addEventListener("change", updateCity);
