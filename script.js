var output;

function getlocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            output += "<br>Latitude: " + position.coords.latitude;
            output += "<br>Longitude: " + position.coords.longitude;
        }, function(error) {
            output += "<br>Error Code = " + error.code + " - " + error.message;
        });
        } else {
            output += "<br>Geolocation is not supported by this browser.";
        }      
}

function start() {
    output = document.getElementById("output")
}