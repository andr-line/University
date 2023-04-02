//import data from './data/students_flags.json' assert {type: 'json'};
// "import ... assert ..." doesn‘t work in my dev environment :(


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

// Functions

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