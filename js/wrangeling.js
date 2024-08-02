const aq = require('arquero')
const fs = require('fs-extra')
const path = require('path')
const d3 = require('d3')

async function proceesing() {
    console.log('---> start processing5')

    const data_all = await aq.load(
        `../js/data_all.csv`,
        { delimiter: ',' },
        { using: aq.fromCSV }
    )
    console.log(data_all)

    const gini_1980_2022 = data_all
        .groupby('shortname', 'region', 'country')
        .pivot('year', 'gini_pretaxes')
        .select('1980', '2022', 'shortname', 'region', 'country')
        .objects()

    console.log(gini_1980_2022)

    // Convert tidyData to CSV format
    const csvData = d3.csvFormat(gini_1980_2022)

    // Write CSV data to file
    const outputPath = path.resolve(__dirname, './gini_1980_2022.csv')
    fs.ensureDirSync(path.dirname(outputPath))
    fs.writeFileSync(outputPath, csvData, 'utf8')

    console.log(`CSV file has been written to ${outputPath}`)

    console.log('<--- finsished proceesing')
}

proceesing()

// async function loading3() {

//     console.log('---> start processing')

//     const gini_income_complete = await aq.load(`../data/output_files/income/3.csv`, { delimiter: ',' }, { using: aq.fromCSV });
//     console.log(gini_income_complete);

//     const gini_income_region = gini_income_complete
//     .impute({ value: () => 0 })
//     .groupby('region', 'year')
//     .rollup({ mean: d => op.mean(d.value) })
//     .objects();

//     console.log(gini_income_region);

//     console.log('<--- finsished processing')

// };

// loading3();

// async function loading4() {
//     console.log('---> start processing')

//     const gini_region = await aq.load(`../data/output_files/gini_region.csv`, { delimiter: ',' }, { using: aq.fromCSV });
//     console.log(gini_region);

//     const gini_region2 = gini_region
//     .groupby('year')
//     .pivot('region', 'mean')
//     .objects();

//     console.log(gini_region2);

//     console.log('<--- finsished processing')

// };

// loading4();
