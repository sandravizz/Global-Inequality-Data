const aq = require('arquero')
const fs = require('fs-extra')
const path = require('path')
const d3 = require('d3')

async function loading() {
    console.log('---> start processing')

    //Loading data
    const data = await aq.load(
        `../js/tidy_data.csv`,
        { delimiter: ',' },
        { using: aq.fromCSV }
    )
    // console.log(data.objects());

    //Loading info
    const WID_countries = await aq.load(
        `../data/WID_countries.csv`,
        { delimiter: ',' },
        { using: aq.fromCSV }
    )
    // console.log(WID_countries.objects());

    //Join data and info
    let data_all = data.join(WID_countries, ['country', 'alpha2']).objects()
    // console.log(data_all);

    const csvData = d3.csvFormat(data_all)
    // console.log(csvData);

    // Write CSV data to file
    const outputPath = path.resolve(__dirname, './data_all.csv')
    fs.ensureDirSync(path.dirname(outputPath))
    fs.writeFileSync(outputPath, csvData, 'utf8')

    console.log(`CSV file has been written to ${outputPath}`)

    console.log('<--- finsished processing')
}

loading()
