

async function loading() {

    console.log('---> start processing')

    const a = await aq.load(`../data/a.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(a.objects());

    const b = await aq.load(`../data/b.csv`, { delimiter: ',' }, { using: aq.fromCSV });
    console.log(b.objects());

    let c = a
    .join(b, ['year', 'year'])
    .objects(); 
    console.log(c); 

    let d = a.cross(b, [['variable', 'value', 'country', 'year'], ['variable', 'value', 'country', 'year']])
    .objects(); 
    console.log(d);

    // let string3 = d3.csvFormat(population_all, ["year", "country", "variable", "value", "region", "region2", "shortname", "titlename"]);
    // console.log(string3);

    console.log('<--- finsished processing')
};

loading();