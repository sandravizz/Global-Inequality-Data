// --------------------------------------
//  Margin and canvas
// --------------------------------------

const margin = {top: 150, right: 50, bottom: 50, left:50};
const width = 1200;
const height = 600;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

const innerChart = svg
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Formating 
// --------------------------------------

let parseDate = d3.timeParse("%Y");
let formatDate = d3.timeFormat("%Y");

// --------------------------------------
//  Scales
// --------------------------------------

let y = d3.scaleTime()
    .domain(d3.extent(data_total, d => (d.year)))
    .range([innerheight, 0]);

let x = d3.scaleLinear()
    .domain([0, d3.max(data_total, d => d.value)])
    .range([0, innerwidth]);

// console.log(data_total.map(d => d.country));

// let c = d3.scaleOrdinal()
//     .domain(["AD", "AE", "AF", "AG", "AI", "AT","PT", "SE", "US", "GB", "DE", "BE", "ZW", "CH", "CG"])
//     .range(["white", "white", "white", "white", "white", "white", "white", "white", "red", "white", "white"]);

// let r2 = d3.scaleSqrt()
//     .domain(d3.extent(data_total, d => d.value))
//     .range([0, 23]);

// let r1 = d3.scaleSqrt()
//     .domain([0, d3.max(data_total, d => d.value)])
//     .range([0, 8]);

//Line
// innerChart
//     .selectAll(".line")
//     .data(data_total)
//     .join("line")
//     .attr("class", "line") 
//     .attr("x1", (d) => x(d.year))
//     .attr("x2", (d) => x(d.year))
//     .attr("y1", innerheight)
//     .attr("y2",  innerheight)
//     .attr("stroke", "red")
//     .attr("stroke-width", 5)
//     .attr("opacity", 1)
//     .transition()
//     .delay((d) => 500 + x(d.year) * 3.6)
//     .duration(1000)
//     .attr("y2", (d) => y(d.value) + r1(d.value));

innerChart
    .selectAll(".circle")
    .data(data_total)
    .join("circle")
    .attr("class", "circle") 
    .attr("cx", (d) => x(d.value))
    .attr("cy", (d) => y(d.year))
    .attr("r", 5)
    .attr("opacity", 0.5)  
    .attr("fill", "white");
















