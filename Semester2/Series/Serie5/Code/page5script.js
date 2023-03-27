// import data from './data/students_flags.json' assert {type: 'json'};
// Doesn't work for me (Safari on iPad)

let data = {};
fetch("./data/students_flags.json")
	.then(response => response.text())
	.then(data => {
		data = JSON.parse(data);
		// Manipulate the data into a single alphabetically sorted array:
		data = data.data
		    .map(e => e.flags)
			.flat()
			.map(e => e.replace(/[^a-z]/gi, ''));
		console.log(data);
		// Count the number of occurrences of each element in the array:
		data = data.reduce(function (acc, curr) { return acc[curr] = (acc[curr] || 0) + 1, acc }, {});
		data = Object.entries(data)
			.sort((a,b) => b[1] - a[1])
		console.log(data[0]);
		
		chart(data, 800, 500, 1)
	})
	.catch(error => {
		//console.error(error);
	});

//chart(800, 500, 1)
	

// D3.js :
function chart(data, width, height, padding = 0) {
	const barWidth = width / data.length;

	const svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);
		
	svg.selectAll("rect")
		.data(data)
		.join(enter => enter.append("rect")
		    .attr("x", (e, i) => i * barWidth)
		    .attr("y", e => height - (e[1] * 4))
		    .attr("width", barWidth - padding)
		    .attr("height", e  => e[1] * 4)
		    .attr("fill", e => "rgb(25, 105, " + e[1] + ")"));

	svg.selectAll("text")
		.data(data)
		.join(enter => enter.append("text")
		    .text(e => e[0])
			.attr("x", (e, i) => (i + 0.5) * barWidth)
			.attr("y", e => height - e[1] * 4 - 3));
	console.log("created bar chart");
};
