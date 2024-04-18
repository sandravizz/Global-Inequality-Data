// --------------------------------------
//  Margin and canvas
// --------------------------------------

const margin = {top: 50, right: 200, bottom: 50, left: 20};
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

const data = d3.csv("/data/output_files/income/4.csv", d => {

  return {
      Gini: +d.mean,
      Region: d.region,
      Year: parseDate(d.year)
  };

}).then(data => {

// const data = d3.csv("/data/gini_all.csv", d => {

//     return {
//         Gini: +d.value,
//         Country: d.country,
//         Region: d.region,
//         Region2: d.region2,
//         Year: parseDate(d.year)
//     };
  
//   }).then(data => {

// console.log(data);
// console.log(data.map(d => d.Region));
// console.log(d3.flatGroup(data, (d => d.Region)));
// console.log(d3.flatGroup(data, (d => d.Region2)));
// console.log(d3.flatGroup(data, (d => d.Country)));

// --------------------------------------
//  Scales
// --------------------------------------

let y = d3.scaleTime()
    .domain(d3.extent(data, d => (d.Year)))
    .range([0, innerheight]);

let x = d3.scaleLinear()
    .domain([0.2, 0.65])
    .range([0, innerwidth]);

// console.log(data_total.map(d => d.country));

let c = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
    .range(["#F2ECCE", "#3DBCD9", "#F2AE2E", "#F2785C", "#D93240"]);

// --------------------------------------
//  Axes 
// --------------------------------------

innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerheight})`)
    .call(d3.axisBottom(x)
         .tickValues([0.3, 0.4, 0.5, 0.6])
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
          .tickValues([parseDate(1980), parseDate(1985), parseDate(1990), parseDate(1995), parseDate(2000), parseDate(2005), parseDate(2010), parseDate(2015), parseDate(2020)])); 

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
    .attr("height", 17)
    .attr("opacity", 1)  
    .attr("fill",  (d) => c(d.Region));

// --------------------------------------
//  Buttons 
// --------------------------------------

const filters = [
  { id: "Asia", label: "Asia", isActive: false,  backgroundcolor: "#F2ECCE" },
  { id: "Europe", label: "Europe", isActive: false, backgroundcolor: "#3DBCD9" },
  { id: "Africa", label: "Africa", isActive: false, backgroundcolor: "#F2AE2E" },
  { id: "Americas", label: "Americas", isActive: false, backgroundcolor: "#F2785C" },
  { id: "Oceania", label: "Oceania", isActive: false, backgroundcolor: "#D93240" }
  ];

  d3.select("#filters")
      .selectAll(".filter")
      .data(filters)
      .join("button")
      .attr("id", d => d.id)
      .text(d => d.label)
      .style("color", "#00161f")
      .style("background-color", d => d.backgroundcolor);


  });
