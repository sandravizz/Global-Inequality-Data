// async function xfetchAndTransform(
//     countryAbbreviation,
//     variableNames,
//     startYear
// ) {
//     const data = await aq.load(
//         `../data/countries/WID_data_${countryAbbreviation}.csv`,
//         { delimiter: ';' },
//         { using: aq.fromCSV }
//     )

//     const result = variableNames.reduce((acc, varName) => {
//         if (!acc) {
//             const filteredTable = data
//                 .filter(
//                     aq.escape(
//                         (d) => d.year >= startYear && d.variable === varName
//                     )
//                 )
//                 .select('country', 'value', 'year', 'variable')
//             // console.log(filteredTable.objects())

//             return filteredTable
//         } else {
//             const filteredTable = data
//                 .filter(
//                     aq.escape(
//                         (d) => d.year >= startYear && d.variable === varName
//                     )
//                 )
//                 .select('country', 'value', 'year', 'variable')
//             // console.log(filteredTable.objects())
//             console.log('data', data)
//             return acc.join(filteredTable, ['year', 'year'])
//         }
//     }, null)

//     return result.object()
// }

async function loadData(countryAbbreviation) {
    const filePath = `../data/countries/WID_data_${countryAbbreviation}.csv`

    try {
        const data = await aq.load(filePath, { delimiter: ';' })
        return data
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
        return
    }
    console.log('data is null NOT bro', countryAbbreviation)

    const filteredData = data
        .filter(
            aq.escape(
                (d) => d.year >= startYear && variableNames.includes(d.variable)
            )
        )
        .select('country', 'variable', 'value', 'year')

    const result = filteredData
        .groupby('year')
        .pivot('variable', 'value')
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
        .map((d) => ({
            year: d.year,
            ...Object.fromEntries(
                variableNames.map((varName) => [varName, d[varName]])
            ),
        }))

    return {
        country_name: countryAbbreviation,
        data: result,
    }
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
        'QB',
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
        'WO',
        'WS',
        'XS',
        'YE',
        'YU',
        'ZA',
        'ZM',
        'ZW',
        'ZZ',
    ]

    const promises = countryNames.map((d) =>
        fetchAndTransform(
            d,
            [
                'npopuli999',
                'rcaincj992',
                'rdiincj992',
                'rhwealj992',
                'rptincj992',
                'gcaincj992',
                'gdiincj992',
                'ghwealj992',
                'gptincj992',
            ],
            '1980'
        )
    )

    const result = await Promise.all(promises)
    console.log('promise.all results', result)

    // let data_total = result.flatMap((d) => d)
    // console.log(data_total)

    // const csv1 = d3.csvFormat(result, [
    //     'year'
    //     'country',
    //     'npopuli999',
    //     'rcaincj992',
    //     'rdiincj992',
    //     'rhwealj992',
    //     'rptincj992',
    //     'gcaincj992',
    //     'gdiincj992',
    //     'ghwealj992',
    //     'gptincj992',
    // ])
    // console.log(csv1);
}

main()
