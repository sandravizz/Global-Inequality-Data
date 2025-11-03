const aq = require('arquero')
const fs = require('fs-extra')
const path = require('path')
const d3 = require('d3')

async function loadData(countryAbbreviation) {
    const filePath = path.resolve(
        __dirname,
        `../data/countries/WID_data_${countryAbbreviation}.csv`
    )

    try {
        return await aq.load(filePath, { delimiter: ';' })
    } catch (error) {
        console.log(
            `File for country ${countryAbbreviation} does not exist or failed to load.`
        )
        return null
    }
}

async function fetchAndTransform(
    countryAbbreviation,
    variableNames,
    startYear
) {
    const data = await loadData(countryAbbreviation)

    if (data == null) {
        return []
    }

    const filteredData = data
        .params({ variableNames, startYear })
        .filter(
            aq.escape(
                (d) =>
                    d.year >= startYear &&
                    variableNames.includes(d.percentile) &&
                    d.variable === 'sptincj992'
            )
        )
        .select('country', 'variable', 'value', 'year', 'percentile')

    const result = filteredData
        .groupby('year', 'country')
        .pivot('percentile', 'value')
        .orderby('year')
        .derive({
            year: aq.escape((d) => parseInt(d.year)),
            ...Object.fromEntries(
                variableNames.map((varName) => [
                    varName,
                    aq.escape((d) => parseFloat(d[varName])),
                ])
            ),
        })
        .objects()

    return result
}

async function processBatch(countries, variableNames, startYear, batchSize = 20) {
    const allResults = []
    
    for (let i = 0; i < countries.length; i += batchSize) {
        const batch = countries.slice(i, i + batchSize)
        console.log(
            `Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
                countries.length / batchSize
            )} (countries ${i + 1}-${Math.min(i + batchSize, countries.length)})`
        )
        
        const promises = batch.map((countryAbbreviation) =>
            fetchAndTransform(countryAbbreviation, variableNames, startYear)
        )
        
        const batchResults = await Promise.all(promises)
        
        // Flatten and add to results immediately
        const batchData = batchResults
            .flatMap((countryData) => countryData)
            .filter(Boolean)
        
        allResults.push(...batchData)
        
        // Force garbage collection hint (memory release)
        if (global.gc) {
            global.gc()
        }
    }
    
    return allResults
}

async function main() {
    const countryNames = [
        'AD',
        'AE',
        'AF',
        'AG',
        'AI',
        'AL',
        'AM',
        'AN',
        'AO',
        'AR',
        'AS',
        'AT',
        'AU',
        'AZ',
        'AW',
        'BA',
        'BB',
        'BD',
        'BE',
        'BF',
        'BG',
        'BH',
        'BI',
        'BJ',
        'BL',
        'BM',
        'BN',
        'BO',
        'BQ',
        'BR',
        'BS',
        'BT',
        'BW',
        'BY',
        'BZ',
        'CA',
        'CD',
        'CF',
        'CG',
        'CH',
        'CI',
        'CK',
        'CL',
        'CM',
        'CN',
        'CO',
        'CR',
        'CS',
        'CU',
        'CV',
        'CY',
        'CZ',
        'CW',
        'DE',
        'DJ',
        'DK',
        'DO',
        'DM',
        'DZ',
        'EC',
        'EE',
        'EG',
        'EH',
        'ER',
        'ES',
        'ET',
        'FI',
        'FJ',
        'FK',
        'FM',
        'FO',
        'FR',
        'GA',
        'GB',
        'GD',
        'GE',
        'GG',
        'GH',
        'GI',
        'GL',
        'GM',
        'GN',
        'GQ',
        'GR',
        'GT',
        'GU',
        'GW',
        'GY',
        'HK',
        'HN',
        'HR',
        'HT',
        'HU',
        'ID',
        'IE',
        'IL',
        'IN',
        'IM',
        'IQ',
        'IR',
        'IS',
        'IT',
        'JM',
        'JO',
        'JP',
        'KI',
        'KE',
        'KG',
        'KH',
        'KM',
        'KN',
        'KP',
        'KR',
        'KS',
        'KW',
        'KY',
        'KZ',
        'LA',
        'LB',
        'LC',
        'LI',
        'LK',
        'LR',
        'LS',
        'LT',
        'LU',
        'LV',
        'LY',
        'MA',
        'MC',
        'MD',
        'ME',
        'MH',
        'MG',
        'MK',
        'ML',
        'MP',
        'MM',
        'MN',
        'MO',
        'MR',
        'MS',
        'MT',
        'MU',
        'MV',
        'MW',
        'MX',
        'MY',
        'MZ',
        'NA',
        'NC',
        'NE',
        'NG',
        'NI',
        'NL',
        'NO',
        'NP',
        'NZ',
        'OM',
        'PA',
        'PE',
        'PF',
        'PG',
        'PH',
        'PK',
        'PL',
        'PM',
        'PR',
        'PS',
        'PT',
        'PW',
        'PY',
        'QA',
        'RO',
        'RS',
        'RU',
        'RW',
        'SA',
        'SB',
        'SC',
        'SD',
        'SE',
        'SG',
        'SH',
        'SI',
        'SK',
        'SL',
        'SM',
        'SN',
        'SO',
        'SR',
        'SS',
        'ST',
        'SU',
        'SV',
        'SW',
        'SX',
        'SY',
        'SZ',
        'TC',
        'TD',
        'TG',
        'TH',
        'TJ',
        'TK',
        'TL',
        'TM',
        'TN',
        'TR',
        'TT',
        'TV',
        'TW',
        'TZ',
        'UA',
        'UG',
        'US',
        'UY',
        'UZ',
        'VA',
        'VC',
        'VE',
        'VG',
        'VI',
        'VN',
        'VU',
        'WF',
        'WS',
        'YE',
        'YU',
        'ZA',
        'ZM',
        'ZW',
        'ZZ',
        'WO',
        'QB',
        'QC',
        'QE',
        'QF',
        'QD',
    ]

    const variableNames = [
        'p99.9p100',
        'p99p100',
        'p90p100',
        'p0p10',
        'p0p1',
        'p0p50',
    ]

    const startYear = 1980

    // Use batch processing to prevent memory leaks
    console.log(`Processing ${countryNames.length} countries in batches...`)
    const tidyData2 = await processBatch(countryNames, variableNames, startYear, 20)

    console.log(`Tidy Data: ${tidyData2.length} rows`)

    // Convert tidyData to CSV format
    const csvData = d3.csvFormat(tidyData2)

    // Write CSV data to file
    const outputPath = path.resolve(__dirname, './output_data/tidy_data2.csv')
    fs.ensureDirSync(path.dirname(outputPath))
    fs.writeFileSync(outputPath, csvData, 'utf8')

    console.log(`CSV file has been written to ${outputPath}`)
}

main()
