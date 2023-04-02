//import data from './data/students_flags.json' assert {type: 'json'};
// "import ... assert ..." doesn‘t work in my dev environment :(

// Dark Mode

// Listener for browsers dark mode setting
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
	checkDarkMode()
});

// Run setup when loading website
window.onload = checkDarkMode();


// Variables

// import country data
let country_data = {};
fetch("./data/country-info.json")
	.then(response => response.text())
	.then(data => {
		country_data = JSON.parse(data);
		document.getElementsByClassName("flag")[0].onclick();
	})
	.catch(error => {
		//console.error(error);
	});


let first = 0;


// Events

// Change android color
window.onkeypress = androidColor();

window.onclick = androidColor();

// Flag onclick
let flags = document.getElementsByClassName("flag");
for (let i=0; i<flags.length; i++) {
	flags[i].onclick = function(e) {
		flags = document.getElementsByClassName("flag");
		for (let j=0; j<flags.length; j++) {
			flags[j].classList.remove("selected");
		}
		this.classList.add("selected");
		displayCountryInfo(this.id)
	}
}

// Functions

// Switch to dark or light mode by adding the .darkmode class to all objects
function checkDarkMode() {
	let elements = document.querySelectorAll("*")
	if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
		Array.prototype.forEach.call(elements, (elem) => {
			elem.classList.add("darkmode")
		})
		// foreach does not work since documents.querySelectorAll does not return an Array but a HTMLCollection
	} else {
		Array.prototype.forEach.call(elements, (elem) => {
			elem.classList.remove("darkmode")
		})
	}
};

// change androids color
function androidColor() {
	// first>=2 to get rid of execution on onload
	if(first>1) {
		document.getElementById("green").setAttribute("fill", randomColor());
		document.getElementById("pink").setAttribute("fill", randomColor())
	} else first++;
};

// Returns a random color
function randomColor() {
	return '#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).substr(1)
};

// calculate area
function calculateArea() {
    var shape = document.getElementById("shape").value;
    var radius = parseFloat(document.getElementById("radius").value);
    var area;

    if (shape === "circle") {
        area = Math.PI * radius * radius;
    } else if (shape === "square") {
        area = radius * radius;
    } else if (shape === "rectangle") {
        var width = parseFloat(prompt("Enter width:"));
        area = radius * width;
    } else if (shape === "triangle") {
        var height = parseFloat(prompt("Enter height:"));
        area = 0.5 * radius * height;
    }

    document.getElementById("result").value = area;
}

// Display appropriate country information in table

function displayCountryInfo(country) {
	document.getElementById("country_name").innerText = country;
	let elements = document.body.getElementsByTagName("*");
	let this_country = country_data[country];
	for (let i=0; i<elements.length; i++) {
		if(elements[i].id in this_country) {
			elements[i].innerText = this_country[elements[i].id];
		}
	}
}