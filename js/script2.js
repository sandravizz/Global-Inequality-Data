
async function fetchAndTransform(name) {
  
  const data = await aq.load(`../data/countries/WID_data_${name}.csv`, { delimiter: ';' }, { using: aq.fromCSV });
  console.log("fetched", name);

  data
  .derive({unit: (d) => op.slice(d.variable, 0, 1)})
  .filter((d) => d.unit === "g" && d.year > "1994" && d.variable ===  "ghwealj992");
  // .print(5);

  let data_g = data
  .derive({unit: (d) => op.slice(d.variable, 0, 1)})
  .filter((d) => d.unit === "g" && d.year > "1994" && d.variable ===  "ghwealj992")
  .objects();

  return data_g;

}

async function main() {

  // list of countries to fetch data from
  const countryNames = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", 
  "BA", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BQ", "BR", "BS", "BT", "BW", "BZ", 
  "CA", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ",
  "DE", "DJ", "DK", "DO", "DZ", "EC", "EE", "EG", "ER", "ES", "ET", "FI", "FR", 
  "GA", "GB", "GD", "GE", "GG", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", 
  "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", 
  "KE", "KG", "KH", "KM", "KP", "KR", "KS", "KW", "KY", "KZ",
  "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY",
  "MA", "MD", "ME", "MG", "MK", "ML", "MM", "MN", "MO", "MR", "MT",
  "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL",
  "NO", "NP", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PR"];

  // fetch and transform data -> return promise
  const promises = countryNames.map(d => fetchAndTransform(d))

  // wait for all promises to have fetched the data and transformed it
  const result = await Promise.all(promises)

  // Flatten the array of arrays
  let data_total = result.flatMap(d => d);
  console.log(data_total);

  // // Save in the csv format
  const string = d3.csvFormat(data_total, ["unit", "year", "country", "variable", "value"]);
  console.log(string);

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

}

main();














