const aq = require('arquero')
const fs = require('fs-extra')
const path = require('path')
const d3 = require('d3')

async function loading() {
    console.log('---> start processing')

    //Loading data
    const data = await aq.load(
        `../js/output_data/tidy_data2.csv`,
        { delimiter: ',' },
        { using: aq.fromCSV }
    )
    console.log(data.objects())

    //Loading info
    const WID_countries = await aq.load(
        `../data/WID_countries.csv`,
        { delimiter: ',' },
        { using: aq.fromCSV }
    )
    console.log(WID_countries.objects())

    //Join data and info
    let data_all2 = data
        .join(WID_countries, ['country', 'alpha2'])
        .select(
            'year',
            'country',
            'p0p1',
            'p0p10',
            'p0p50',
            'p90p100',
            'p99p100',
            'region',
            'region2',
            'shortname'
        )
        .rename({
            p0p1: 'lowest_1',
            p0p10: 'lowest_10',
            p0p50: 'lowest_50',
            p90p100: 'highest_10',
            p99p100: 'highest_1',
        })
        .derive({ decade: (d) => Math.floor(d.year / 10) * 10 })
        .objects()
    console.log(data_all2)

    const csvData2 = d3.csvFormat(data_all2)
    console.log(csvData2)

    //Write CSV data to file
    const outputPath = path.resolve(__dirname, './output_data/data_all2.csv')
    fs.ensureDirSync(path.dirname(outputPath))
    fs.writeFileSync(outputPath, csvData2, 'utf8')

    console.log(`CSV file has been written to ${outputPath}`)

    console.log('<--- finsished processing')
}

loading()
