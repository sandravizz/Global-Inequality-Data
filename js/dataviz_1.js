// --------------------------------------
//  Margin and canvas
// --------------------------------------

const margin = {top: 50, right: 50, bottom: 50, left: 50};
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

const data = d3.csv("/data/gini_all.csv", d => {

  return {
      Gini: +d.value,
      Country: d.country,
      Region: d.region,
      Region2: d.region2,
      Year: parseDate(d.year)
  };

}).then(data => {

  // console.log(data);
  // console.log(data.map(d => d.Region));
  // console.log(d3.flatGroup(data, (d => d.Region)));

// --------------------------------------
//  Scales
// --------------------------------------

let y = d3.scaleTime()
    .domain(d3.extent(data, d => (d.Year)))
    .range([0, innerheight]);

let x = d3.scaleLinear()
    .domain([0.4, d3.max(data, d => d.Gini)])
    .range([0, innerwidth]);

// console.log(data_total.map(d => d.country));

let c = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
    .range(["white", "white", "white", "white", "white"]);

// --------------------------------------
//  Axes 
// --------------------------------------

innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerheight})`)
    .call(d3.axisBottom(x)
        	.tickValues([0.6, 0.8, 1])
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
          .tickPadding(150)
          .tickValues([parseDate(1995), parseDate(2000), parseDate(2005), parseDate(2010), parseDate(2015), parseDate(2020), parseDate(2022)])); 

// --------------------------------------
//  Data drawing
// --------------------------------------

innerChart
    .selectAll(".rect")
    .data(data)
    .join("rect")
    .attr("class", "rect") 
    .attr("x", (d) => x(d.Gini))
    .attr("y", (d) => y(d.Year))
    .attr("width", 2)
    .attr("height", 15)
    .attr("opacity", 0.6)  
    .attr("fill",  (d) => c(d.Region));

  });
