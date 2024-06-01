async function loading1() {

    console.log('---> start processing')

    const population = await aq.load(`../data/output_files/population/1.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(population.objects());

    const WID_countries = await aq.load(`../data/WID_countries.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(WID_countries.objects());

    let population_all = population
    .join(WID_countries, ['country', 'alpha2'])
    .objects(); 

    console.log(population_all); 

    let string3 = d3.csvFormat(population_all, ["year", "country", "variable", "value", "region", "region2", "shortname", "titlename"]);
    console.log(string3);

    console.log('<--- finsished processing')
};

loading1();