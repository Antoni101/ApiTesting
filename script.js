var output;
var latitude;
var longitude;

function get_apikey() {
  return document.getElementById("apikey").value;
}

function getf(celsius) {
    var fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
}
var output;

function get_apikey() {
  return document.getElementById("apikey").value;
}

function doWeather() {
  var apiKey = get_apikey();
  if (!apiKey) {
    console.error("API Key is missing!");
    output.innerHTML = "API Key is missing!";
    return;
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          if (data && data.main && data.main.temp) {
            output.innerHTML = 'Current Temperature:<br> ' + data.main.temp + ' °C';
            f = getf(data.main.temp)
            output.innerHTML += "<br>" + f + " °F"
          } else {
            output.innerHTML = 'No temperature data available';
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          output.innerHTML = 'Error fetching data: ' + error.message;
        });

    }, function(error) {
      console.error('Error getting location:', error);
      output.innerHTML = 'Error getting location: ' + error.message;
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
    output.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function start() {
  output = document.getElementById("output");
}
