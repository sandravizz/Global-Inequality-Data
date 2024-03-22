
async function fetchAndTransform(name) {
  
  const data = await aq.load(`../data/countries/WID_data_${name}.csv`, { using: aq.fromCSV });

  console.log("fetched", name);

  data.derive({
    unit: (d) => op.slice(d.variable, 0, 1)
  })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable ===  "ghwealj992");
    // .print(5);

  let data_g = data.derive({
    unit: (d) => op.slice(d.variable, 0, 1)
  })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable ===  "ghwealj992")
    .objects();

  return data_g;
}

async function main() {

  // list of countries to fetch data from
  const countryNames = ["PT", "SE", "AE", "US", "GB", "DE", "AT"]

  // fetch and transform data -> return promise
  const promises = countryNames.map(d => fetchAndTransform(d))

  // wait for all promises to have fetched the data and transformed it
  const result = await Promise.all(promises)

  // Flatten the array of arrays
  let data_total = result.flatMap(d => d);
  console.log(data_total);

const string = d3.csvFormat(data_total, ["unit", "year", "country", "variable", "value"]);
  console.log(string);

}

main();














