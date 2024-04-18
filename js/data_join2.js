async function loading2() {

  console.log('---> start processing')

  const years = await aq.load(`../data/output_files/years.csv`, { using: aq.fromCSV });
  const yearsArray = years.objects().map(d => d.year);
  console.log(yearsArray); 
  
  const gini_all_income = await aq.load(`../data/output_files/income/2.csv`, { delimiter: ',' }, { using: aq.fromCSV });
  console.log(gini_all_income);

  const countriesObject = gini_all_income.objects().reduce((acc, d) => {
    acc[d.country] = acc[d.country] ? acc[d.country].add(d) : new Set([d]);
    return acc;
  }, {});

  Object.values(countriesObject).forEach(countryData => {
    const countryYears = Array.from(countryData).map(d => d.year);
    const missingYears = yearsArray.filter(y => !countryYears.includes(y));

    missingYears.forEach(year => {
      const missingYearData = { year: year, value: null }; 
      countryData.add(missingYearData);
    });
  });

  let gini_all_completeyears = Object.values(countriesObject).flatMap(d => Array.from(d));
  console.log(gini_all_completeyears);

  let string = d3.csvFormat(gini_all_completeyears, ["year", "country", "variable", "value", "region", "region2", "shortname", "titlename"]);
  console.log(string);

  console.log('<--- finsished processing')
};

loading2();
























