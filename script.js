window.addEventListener("load", () => {
  let long;
  let lat;
  const locationName = document.querySelector(".location-name");
  const locationRegion = document.querySelector(".location-region");
  const locationCountry = document.querySelector(".location-country");
  const weatherIcon = document.querySelector(".icon");
  const degreeSection = document.querySelector(".degree-section");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureDegreeSpan = document.querySelector("span");
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherapi.com/v1/current.json?key=f75a0e7dbcf047f39b3230755212709&q=${lat},${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          //Set DOM elements from the API
          locationName.textContent = data.location.name;
          locationRegion.textContent = data.location.region;
          locationCountry.textContent = data.location.country;
          weatherIcon.src = data.current.condition.icon;
          temperatureDegree.textContent = data.current.temp_c;
          temperatureDescription.textContent = data.current.condition.text;
          // Click to change to fahrenheit
          degreeSection.addEventListener("click", () => {
            if (temperatureDegreeSpan.textContent === "C") {
              temperatureDegreeSpan.textContent = "F";
              temperatureDegree.textContent = data.current.temp_f;
            } else {
              temperatureDegreeSpan.textContent = "C";
              temperatureDegree.textContent = data.current.temp_c;
            }
          });
        });
    });
  } else {
    h1.textContent = "Something went wrong.";
  }
});
