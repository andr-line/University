//import data from './data/students_flags.json' assert {type: 'json'};
// "import ... assert ..." doesn‘t work in my dev environment :(

// import country data
console.log("running")
let country_data = {};
fetch("data/country-info.json")
	.then(response => response.text())
	.then(data => {
		country_data = JSON.parse(data);
		// Display info of first country after loading the data
		document.getElementsByClassName("flag")[0].onclick();
	})
	.catch(error => {
		console.error(error);
	});

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