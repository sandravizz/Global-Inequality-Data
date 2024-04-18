async function loading2() {

  console.log('---> start processing')

  const years = await aq.load(`../data/output_files/years.csv`, { using: aq.fromCSV });
  const gini_all_income = await aq.load(`../data/output_files/income/1.csv`, { delimiter: ',' }, { using: aq.fromCSV });

  console.log(gini_all_income);

  const yearsArray = years.objects().map(d => d.year);
  console.log(yearsArray);

  const countriesObject = gini_all_income.objects().reduce((acc, d) => {
    acc[d.country] = acc[d.country] ? acc[d.country].add(d) : new Set([d]);
    return acc;
  }, {});

  // Iterate over each country's data to find and add missing years
  Object.values(countriesObject).forEach(countryData => {
    const countryYears = Array.from(countryData).map(d => d.year);
    const missingYears = yearsArray.filter(y => !countryYears.includes(y));

    // For each missing year, create a new data entry with null value and add it to the country's set
    missingYears.forEach(year => {
      const missingYearData = { year: year, value: null }; // Assuming the structure of missing data
      countryData.add(missingYearData);
    });
  });

  let gini_all_completeyears = Object.values(countriesObject).flatMap(d => Array.from(d));

  // Log the final countriesObject with all data, including added missing years
  console.log(gini_all_completeyears);

  // Save in the csv format, which can be copied from the console into a new file
  let string = d3.csvFormat(gini_all_completeyears, ["unit", "year", "country", "variable", "value", "region", "region2", "shortname", "titlename"]);
  console.log(string);

  console.log('<--- finsished processing')
};

loading2();
























