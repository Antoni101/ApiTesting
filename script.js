var output;

function get_apikey() {
  return document.getElementById("apikey").value;
}

function doWeather() {
  var apiKey = get_apikey();
  if (!apiKey) {
    console.error("API Key is missing!");
    return;
  }

  // Assuming you have latitude and longitude variables set here; otherwise, you'll need to define them
  var latitude = 42.279286;  // Example latitude
  var longitude = -71.416156; // Example longitude
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.main && data.main.temp) {
        output.innerHTML = 'Current Temperature: ' + data.main.temp + '°C';
      } else {
        output.innerHTML = 'No temperature data available';
      }
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      output.innerHTML = 'Error fetching data: ' + error;
    });
}

function start() {
  output = document.getElementById("output");
}
