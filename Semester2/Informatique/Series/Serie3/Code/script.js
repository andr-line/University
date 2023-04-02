// Variables

let first = 0;


// Events

// Listener for browsers dark mode setting
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
	checkDarkMode()
});

// Set dark mode when loading website
window.onload = checkDarkMode();

window.onkeypress = androidColor();

window.onclick = androidColor();


// Functions

// Switch to dark or light mode by adding the .darkmode class to all objects
function checkDarkMode() {
	elements = document.querySelectorAll("*")
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
	