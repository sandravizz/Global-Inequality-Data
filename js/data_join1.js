async function loading1() {

    console.log('---> start processing')

    const gini_income = await aq.load(`../data/output_files/income/1.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(gini_income.objects());

    const WID_countries = await aq.load(`../data/WID_countries.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(WID_countries.objects());

    let gini_income_all = gini_income
    .join(WID_countries, ['country', 'alpha2'])
    .objects(); 

    console.log(gini_income_all); 

    let string2 = d3.csvFormat(gini_income_all, ["year", "country", "variable", "value", "region", "region2", "shortname", "titlename"]);
    console.log(string2);

    console.log('<--- finsished processing')
};

loading1();