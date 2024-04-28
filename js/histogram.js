// --------------------------------------
//  Margin and canvas
// --------------------------------------

const margin = {top: 10, right: 200, bottom: 50, left: 40};
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
let format = d3.format(".0");

// --------------------------------------
//  Data loading 
// --------------------------------------

const data = d3.csv("/data/output_files/income/3.csv", d => {

    return {
        Gini: +d.value,
        Country: d.country,
        Region: d.region,
        Region2: d.region2,
        Year: +d.year
    };
  
  }).then(data => {

data2 = data
  .filter(d => d.Year < 1981)
  .sort((a,b) => b.Gini - a.Gini)
  .map(d => d.Gini); 

console.log(data2); 


bins = d3.bin().thresholds(40)(data2);

console.log(bins[0].x0); 

// --------------------------------------
//  Scales
// --------------------------------------

let y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([innerheight, 0]);

let x = d3.scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([0, innerwidth]); 

// --------------------------------------
//  Axes 
// --------------------------------------

innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerheight})`)
    .call(d3.axisBottom(x)
         .tickValues([0.2, 0.4, 0.6, 0.8])
     	 .tickSize(0)
         .tickFormat(format)
         .tickPadding(25));

innerChart
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(0, 10)`)
    .call(d3.axisRight(y)
          .tickSize(0)
          .tickFormat(formatDate)
          .tickPadding(30)
          .tickValues([parseDate(1980), parseDate(1985), parseDate(1990), parseDate(1995), parseDate(2000), parseDate(2005), parseDate(2010), parseDate(2015), parseDate(2020)])); 

// --------------------------------------
//  Data drawing
// --------------------------------------

innerChart
.append("g")
.selectAll("rect")
.data(bins)
.join("rect")
.attr("x", d => x(d.x0) + 1)
.attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
.attr("y", d => y(d.length))
.attr("height", d => y(0) - y(d.length));

  });
