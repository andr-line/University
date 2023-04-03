// Move table to mouse cursor
window.addEventListener("mousemove", (event) => {
	let tooltip = d3.select("#tooltip");
	tooltip.style("left", event.clientX + "px");
	tooltip.style("top", event.clientY + "px")
});

// Other stuff
let width = (window.innerWidth - 50) * 0.7;
let height = (window.innerHeight - 50) * 0.7;

let projection = d3.geoMercator();
let path = d3.geoPath().projection(projection);

let svg = d3.select('div#map').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg-content")
    .attr("viewbox", `0 0 ${width} ${height}`)

// load and display the World
let g = svg.append("g");
d3.json("data/world-lowres.geo.json").then((topology) => {
	let color = ["#ccc", "green", "orange", "yellow", "red", "purple", "blue"]
    let features = topology.features
    projection = projection.fitSize([width, height], topology)
    path = d3.geoPath().projection(projection);
    g.selectAll("path")
        .data(features)
        .join((enter) => {
            enter.append("path")
                .attr("d", path)
                .attr("title", d => d.properties.name)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("width", width)
                .attr("height", height)
				.style("fill", d => {
					let c = d.properties.mapcolor7 + 2;
					return "#" + c + "0" + c + "0" + c + "0"
				})
				.on("mouseover", (event, data) => {
					let values = ["name", "type", "pop_est", "region_wb", "economy", "gdp_md_est"];

					// Show tooltip table
					let tooltip = d3.select("#tooltip");
					tooltip.style("opacity", "1");
					// Change text to country data
					for(i=0; i<values.length; i++) {
						d3.select("#" + values[i])
						    .text(data.properties[values[i]])
					}
				})
				.on("mouseout", () => {
					let tooltip = d3.select("#tooltip");
					tooltip.style("opacity", "0");
				});
				checkDarkMode()
        },
            (update) => update,
            (exit) => exit.remove()


        );
});

