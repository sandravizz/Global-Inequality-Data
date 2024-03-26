
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

  // List of countries to fetch data from
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
  "NO", "NP", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PR",
  "PS", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", 
  "SC", "SD", "SE", "SG", "SH", "SI", "SK", "SL", "SM", "SN", "SO",
  "SR", "SS", "ST", "SU", "SV", "SX", "SY", "SZ", "TD", "TG", "TH",
  "TJ", "TL", "TM", "TN", "TR", "TT", "TW", "TZ", "UA", "UG", "US",
  "UY", "UZ", "VE", "VN", "YE", "YU", "ZA", "ZM", "ZW"];

  // Fetch and transform data -> return promise
  const promises = countryNames.map(d => fetchAndTransform(d))

  // Wait for all promises to have fetched the data and transformed it
  const result = await Promise.all(promises)

  // Flatten the array of arrays
  let data_total = result.flatMap(d => d);
  console.log(data_total);

  // Save in the csv format
  const string = d3.csvFormat(data_total, ["unit", "year", "country", "variable", "value"]);
  console.log(string);

}

main();














