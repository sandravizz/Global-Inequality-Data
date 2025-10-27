const aq = require('arquero')
const fs = require('fs-extra')
const path = require('path')
const d3 = require('d3')

async function proceesing() {
    console.log('---> start processing5')

    const data_all = await aq.load(
        `../js/output_data/data_all.csv`,
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
    const outputPath = path.resolve(
        __dirname,
        './output_data/gini_1980_2022.csv'
    )
    fs.ensureDirSync(path.dirname(outputPath))
    fs.writeFileSync(outputPath, csvData, 'utf8')

    console.log(`CSV file has been written to ${outputPath}`)

    console.log('<--- finsished proceesing')
}

proceesing()
