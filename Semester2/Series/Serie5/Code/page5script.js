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
	const totalWidth = width + 20;
	// scaling using the maximum value in the data: ["name", value]
    const maxValue = data.reduce((a,b) => a[1] > b[1] ? a : b)[1];
	const scaling = height / maxValue - 10;

	const svg = d3.select("body")
		.append("svg")
		.attr("width", totalWidth)
		.attr("height", height)
		.attr("viewBox", "-20, 0, " + totalWidth + ", " + height)
		
	svg.selectAll("rect")
		.data(data)
		.join(enter => enter.append("rect")
		    .attr("x", (e, i) => i * barWidth)
		    .attr("y", e => height - (e[1] * scaling))
		    .attr("width", barWidth - padding)
		    .attr("height", e  => e[1] * scaling)
		    .attr("fill", e => "rgb(25, 105, " + e[1] + ")"));

	svg.selectAll("text")
		.data(data)
		.join(enter => enter.append("text")
		    .text(e => e[0])
			.attr("x", (e, i) => (i + 0.5) * barWidth)
			.attr("y", e => height - e[1] * scaling - 3)
			.attr("transform", (e, i) => "rotate(-90, " + (i * barWidth + barWidth * 0.5) + ", " + (height - e[1] * scaling - 3) + ")" )
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "white"));

	
	const yAxis = d3.axisLeft(yScale)
		.ticks(5,4n);

	const yScale = d3.scaleLinear()
		.domain([0, maxValue])
		.range([height, 0]);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + 20 + ", 0)")
		.call(yAxis);

	console.log("created bar chart");
};
