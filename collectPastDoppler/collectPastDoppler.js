
let imageArray = [];  // global variable to hold stack of images for animation
let count = 0;          // global var


function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.classList.add("dopplerImg");
		// newImage.style.display = "none";
		imageArray.push(newImage);
		count++;
		if (count >= 10) {
			console.log("Got 10 doppler images");
			addToContainer();
			animateDoppler();
		}
	}
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0');
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
	};
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	};
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}
}

function addToContainer(){
	let container = document.getElementById("container");
	for(let i = 0; i < imageArray.length; i++){
		container.appendChild(imageArray[i]);
	}
}

getTenImages();






