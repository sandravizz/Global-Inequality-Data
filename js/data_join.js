async function loading2() {
  console.log('---> start processing')

  // Load years and Gini data from CSV files
  const years = await aq.load(`../data/years.csv`, { using: aq.fromCSV });
  const gini_all = await aq.load(`../data/gini_all.csv`, { delimiter: ',' }, { using: aq.fromCSV });

  // Extract an array of years from the loaded data
  const yearsArray = years.objects().map(d => d.year);

  // Construct an object country as key and data in a Set 
  const countriesObject = gini_all.objects().reduce((acc, d) => {
    // If the country already exists in the object, add the new data to its set
    // Otherwise, create a new set with the current data
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


  // Log the final countriesObject with all data, including added missing years
  console.log(Object.values(countriesObject).flatMap(d => Array.from(d)))

  console.log('<--- finsished processing')
};

loading2();
























