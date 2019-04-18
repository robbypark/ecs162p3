"strict mode";

let object;

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {

   let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=ee8175bedcc610f1b1671a5c2807a5c4";

  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string 
      object = JSON.parse(responseStr);  // turn it into an object
      console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
      // if match, update ui
      // else, not found msg
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
    // not found msg
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed 
makeCorsRequest();
