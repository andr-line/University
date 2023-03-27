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
function chart(data, width, height, barPadding = 0, padding = 20) {
    const diagramWidth = width - padding * 2;
	const diagramHeight = height - padding * 2;
	const barWidth = diagramWidth / data.length;
	// scaling using the maximum value in the data: ["name", value]
    const maxValue = data.reduce((a,b) => a[1] > b[1] ? a : b)[1];
	const scaling = diagramHeight / maxValue;

	const svg = d3.select("#chart").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "" + -padding + " " + -padding + " " + (width + 2 * padding) + " " + (height + 2 * padding))
		.attr("x", 100);
		
	svg.selectAll("rect")
		.data(data)
		.join(enter => enter.append("rect")
		    .attr("x", (e, i) => i * barWidth)
		    .attr("y", e => height - (e[1] * scaling))
		    .attr("width", barWidth - barPadding)
		    .attr("height", e  => e[1] * scaling)
		    .attr("fill", e => "rgb(25, 105, " + e[1] + ")"));

	svg.selectAll("text")
		.data(data)
		.join(enter => enter.append("text")
		    .text(e => e[0])
			.attr("x", (e, i) => (i + 0.5) * barWidth)
			.attr("y", e => diagramHeight - e[1] * scaling - 3)
			.attr("transform", (e, i) => "rotate(-90, " + (i * barWidth + barWidth * 0.5) + ", " + (diagramHeight - e[1] * scaling - 3) + ") translate(" + -padding * 2 + ", 2)" )
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "gray"));


	const yScale = d3.scaleLinear()
		.domain([maxValue, 0])
		.range([padding * 2 + diagramHeight - maxValue * scaling, padding * 2 + diagramHeight]);

	const yAxis = d3.axisLeft(yScale)
	.ticks(10);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + 0 + ", 0)")
		.call(yAxis);

	console.log("created bar chart");
};
