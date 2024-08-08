const aq = require('arquero')
const fs = require('fs-extra')
const path = require('path')
const d3 = require('d3')

async function proceesing() {
    console.log('---> start processing5')

    const data_all2 = await aq.load(
        `../js/output_data/data_all2.csv`,
        { delimiter: ',' },
        { using: aq.fromCSV }
    )
    console.log(data_all2)

    const share_1980_2022_highest_10 = data_all2
        .groupby('shortname', 'region', 'country')
        .pivot('year', 'highest_10')
        .rename({
            1980: '1980_highest_10',
            2022: '2022_highest_10',
        })
        .select(
            '1980_highest_10',
            '2022_highest_10',
            'shortname',
            'region',
            'country'
        )

    const share_1980_2022_lowest_50 = data_all2
        .groupby('shortname', 'region', 'country')
        .pivot('year', 'lowest_50')
        .rename({
            1980: '1980_lowest_50',
            2022: '2022_lowest_50',
        })
        .select(
            '1980_lowest_50',
            '2022_lowest_50',
            'shortname',
            'region',
            'country'
        )

    let share_1980_2022 = share_1980_2022_lowest_50
        .join(share_1980_2022_highest_10, ['country', 'country'])
        .rename({
            shortname_1: 'shortname',
            region_1: 'region',
        })
        .select(
            '1980_lowest_50',
            '2022_lowest_50',
            'shortname',
            'region',
            'country',
            '1980_highest_10',
            '2022_highest_10'
        )
        .objects()

    console.log(share_1980_2022)

    // Convert tidyData to CSV format
    const csvData = d3.csvFormat(share_1980_2022)

    // Write CSV data to file
    const outputPath = path.resolve(
        __dirname,
        './output_data/share_1980_2022.csv'
    )
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
