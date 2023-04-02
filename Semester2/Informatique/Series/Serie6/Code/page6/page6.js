// import data from './data/students_flags.json' assert {type: 'json'};
// Doesn't work for me (Safari on iPad), therefore the following workaround:

// Import data
let data = {};
fetch("data/students_flags.json")
	.then(response => response.text())
	.then(data => {
		data = JSON.parse(data);

		// Manipulate the data into a single array:
		data = data.data
		    .map(e => e.flags)
			.flat()
			.map(e => e.replace(/[^a-z]/gi, ''));
		
		// Count the number of occurrences of each element in the array:
		data = data.reduce(function (acc, curr) { return acc[curr] = (acc[curr] || 0) + 1, acc }, {});
		// Sort the resulting two dimensional array by number of occurrences:
		data = Object.entries(data)
			.sort((a,b) => b[1] - a[1])

		// Get the dimensions of the viewport:
		let w = window.innerWidth;
		let h = window.innerHeight;
		
		// Create the chart with the data:
		chart(data, w * 0.7, h * 0.6, 1);
	})
	.catch(error => {
		console.error(error);
	});