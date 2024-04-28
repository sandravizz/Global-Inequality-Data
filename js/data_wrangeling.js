async function loading3() {
    console.log('---> start processing')
  
    const gini_income_complete = await aq.load(`../data/output_files/income/3.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(gini_income_complete);

    const gini_income_region = gini_income_complete
    .impute({ value: () => 0 })
    .groupby('region', 'year')
    .rollup({ mean: d => op.mean(d.value) })    
    .objects();

    console.log(gini_income_region);

    let string3 = d3.csvFormat(gini_income_region, ["year", "mean", "region"]);
    console.log(string3);

    console.log('<--- finsished processing')

};

loading3();


// async function loading4() {
//     console.log('---> start processing')
  
//     const gini_region = await aq.load(`../data/output_files/gini_region.csv`, { delimiter: ',' }, { using: aq.fromCSV });
//     console.log(gini_region);

//     const gini_region2 = gini_region
//     .groupby('year')
//     .pivot('region', 'mean') 
//     .objects();

//     console.log(gini_region2);

//     let string4 = d3.csvFormat(gini_region2, ["year", "Africa",
//     "Americas", "Asia", "Europe", "Oceania"]);
//     console.log(string4);

//     console.log('<--- finsished processing')

// };

// loading4();
