//login

let container1 = document.getElementById("container1");

toggle = () => {
  container1.classList.toggle("sign-in");
  container1.classList.toggle("sign-up");
};

setTimeout(() => {
  container1.classList.add("sign-in");
}, 200);


// Function to handle sign-up form submission
function signUp() {
    // Get sign-up form values
    const username = document.querySelector('#signUpUsername').value;
    const email = document.querySelector('#signUpEmail').value;
    const password = document.querySelector('#signUpPassword').value;

    // Store sign-up data in localStorage (or sessionStorage)
    localStorage.setItem('signUpData', JSON.stringify({ username, email, password }));

    // Switch to sign-in section
    switchToSignIn();
}

// Function to switch to sign-in section
function switchToSignIn() {
    // Get sign-in form elements
    const signInUsernameInput = document.querySelector('#signInUsername');
    const signInPasswordInput = document.querySelector('#signInPassword');

    // Retrieve sign-up data from localStorage
    const signUpData = JSON.parse(localStorage.getItem('signUpData'));

    // Fill sign-in form with sign-up data (optional)
    if (signUpData) {
        signInUsernameInput.value = signUpData.username;
        signInPasswordInput.focus(); // Focus on password field
    }

    // Show sign-in section and hide sign-up section
    // Add your code to toggle between sign-up and sign-in sections
}





//About Us



function startCountUp() {
	countUp('customerCounter', 0, 500, 3000);
	countUp('professionalsCounter', 0, 200, 2500);
	countUp('productsCounter', 0, 100, 2000);
	countUp('petsHostedCounter', 0, 1000, 3500);
  }
  
  function countUp(id, start, end, duration) {
	var range = end - start;
	var current = start;
	var increment = end > start ? 1 : -1;
	var stepTime = Math.abs(Math.floor(duration / range));
	var timer = setInterval(function() {
	  current += increment;
	  document.getElementById(id).innerText = current;
	  if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
		clearInterval(timer);
		document.getElementById(id).innerText = end;
	  }
	}, stepTime);
  }


  
  

  document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
    const imageSources = [
        "/img/ani1.jpg",
        "../img/ani2.jpg",
        "../img/ani3.jpg",
        "../img/ani4.jpg",
        "../img/ani5.jpg",
        "../img/ani6.jpg",
        "../img/ani7.jpg",
        "../img/ani8.jpg"
    ];

    // Shuffle the array and select the first 5 images
    const selectedImages = imageSources.sort(() => 0.5 - Math.random()).slice(0, 5);

    selectedImages.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Happy Animal";
        imageContainer.appendChild(img);
    });
});



// add loaction to care animal



let map = L.map('map').setView([51.505, -0.09], 13);
let marker;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Function to reverse geocode coordinates to address
function reverseGeocode(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name;
            document.getElementById("current-location-address").value = address;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Get the user's current location and display the address
function setCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            map.setView([lat, lon], 13);

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([lat, lon]).addTo(map)
                .bindPopup("You are here!")
                .openPopup();

            reverseGeocode(lat, lon);
        }, () => {
            alert("Unable to retrieve your location");
        });
    } else {
        alert("Geolocation is not supported by this browser");
    }
}

// Function to add marker and update address on map click
map.on('click', function(e) {
    const latlng = e.latlng;
    
    if (marker) {
        map.removeLayer(marker);
    }
    
    marker = L.marker(latlng).addTo(map);
    
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name;
            document.getElementById("address-input").value = address;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Function to search for address and display it on the map
document.getElementById("search-button").addEventListener("click", () => {
    const address = document.getElementById("address-input").value;
    geocodeAddress(address);
});

// Function to geocode address and display it on the map
function geocodeAddress(address) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const firstResult = data[0];
                const lat = firstResult.lat;
                const lon = firstResult.lon;

                map.setView([lat, lon], 13);

                if (marker) {
                    map.removeLayer(marker);
                }

                marker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(firstResult.display_name)
                    .openPopup();
            } else {
                alert("Address not found");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Set the map to the user's current location and display address on page load
window.onload = setCurrentLocation;
