
async function fetchAndTransform(name) {
  const data = await aq.load(`../data/countries/WID_data_${name}.csv`, { using: aq.fromCSV });

  data.derive({
    unit: (d) => op.slice(d.variable, 0, 1)
  })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
  // .print(5);

  let data_g = data.derive({
    unit: (d) => op.slice(d.variable, 0, 1)
  })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .objects();

  return data_g;
}


async function main() {

  // list of countries to fetch data from
  const countryNames = ["PT", "DE", "US", "GB", "SE", "AE"]

  // fetch and transform data -> return promise
  const promises = countryNames.map(d => fetchAndTransform(d))

  // wait for all promises to have fetched the data and transformed it
  const result = await Promise.all(promises)

  // Flatten the array of arrays
  console.log(result.flatMap(d => d))

}

main();












