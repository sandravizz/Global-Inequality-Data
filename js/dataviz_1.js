// --------------------------------------
//  Margin and canvas
// --------------------------------------

const margin = {top: 10, right: 50, bottom: 50, left:50};
const width = 1200;
const height = 550;
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
//  Data loading 
// --------------------------------------

const data = d3.csv("./data/gini_all.csv", d => {

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
    .range([innerheight, 0]);

let x = d3.scaleLinear()
    .domain([0.3, d3.max(data, d => d.Gini)])
    .range([0, innerwidth]);

// console.log(data_total.map(d => d.country));

let c = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
    .range(["white", "white", "white", "white", "white"]);

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
