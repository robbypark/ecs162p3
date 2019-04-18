"strict mode";

let object;

function update() {
    let input = document.getElementById("userInput");
    let inputStr = input.value;
    makeCorsRequest(inputStr.trim());
}

// Make the actual CORS request.
function makeCorsRequest(inputStr) {

    let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q="
        + inputStr + ",US&units=imperial&APPID=ee8175bedcc610f1b1671a5c2807a5c4";
    console.log(url);

    let xhr = createCORSRequest('GET', url);

    // checking if browser does CORS
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Load some functions into response handlers.
    xhr.onload = function () {
        let responseStr = xhr.responseText;  // get the JSON string
        object = JSON.parse(responseStr);
        // console.log(JSON.stringify(object, undefined, 2));
        if(object.cod === "404"){
            alert('City not found.');
        }

        // else if(outOfRange()){
        //     alert('City not found.');
        // }

        else {
            // update ui
            updateUI();
        }
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    // Actually send request to server
    xhr.send();
}

// Create the XHR object.
function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);  // call its open method
    return xhr;
}

// check if city is out of 150 mi range
function outOfRange(){
    let lat = object.city.coord.lat;
    let lon = object.city.coord.lon;
    console.log(lat + " " + lon);
    let distMi = 0.62137119224 * distKmTwoCoords(lat, lon, 38.5816, -121.4944); // SAC coords
    console.log(distMi + " mi");

    return distMi > 150.0;
}

/*src: https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates*/
function distKmTwoCoords(lat1, lon1, lat2, lon2) {
    let earthRadiusKm = 6371;

    let dLat = degreesToRadians(lat2-lat1);
    let dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
/* end src */

function updateUI(){
    let current = object.list[0];
    let hourlyList = object.list.slice(1, 6);
    console.log(current);
    updateCurrentUI(current);
}

function updateCurrentUI(current){
    let currentTime = document.getElementById("currentTime");
    let currentIcon = document.getElementById("currentIcon");
    let currentTemp = document.getElementById("currentTemp");

    let date = new Date(current.dt * 1000);
    console.log();
    let hours = date.getHours();
    let suffix = hours >= 12 ? "PM" : "AM";
    hours = ((hours + 11) % 12 + 1);
    currentTime.innerHTML = hours + suffix;
    currentIcon.src = "../assets/" + current.weather[0].icon + ".svg";
    currentTemp.innerHTML = parseInt(current.main.temp);

}


// Do a CORS request to get Davis weather hourly forecast
// run this code to make request when this script file gets executed
makeCorsRequest("Davis,CA");