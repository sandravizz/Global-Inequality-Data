async function loading3() {
    console.log('---> start processing')
  
    const gini_complete = await aq.load(`../data/gini_complete.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(gini_complete);

    // .print(5);

    const gini_region = gini_complete
    .impute({ value: () => 0 })
    .groupby('region', 'year')
    .rollup({ mean: d => op.mean(d.value) })
    .objects();

    console.log(gini_region);

    let string3 = d3.csvFormat(gini_region, ["year", "mean", "region"]);
    console.log(string3);

    console.log('<--- finsished processing')

};

loading3();
