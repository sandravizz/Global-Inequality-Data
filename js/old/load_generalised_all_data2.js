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
        return []
    }

    const filteredData = data
        .params({ variableNames, startYear })
        .filter(
            aq.escape(
                (d) => d.year >= startYear && variableNames.includes(d.variable)
            )
        )
        .select('country', 'variable', 'value', 'year')

    const result = filteredData
        .groupby('year', 'country')
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

    return result
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

    const variableNames = [
        'npopuli999',
        'rcaincj992',
        'rdiincj992',
        'rhwealj992',
        'rptincj992',
        'gcaincj992',
        'gdiincj992',
        'ghwealj992',
        'gptincj992',
    ]

    const startYear = 1980

    const promises = countryNames.map((countryAbbreviation) =>
        fetchAndTransform(countryAbbreviation, variableNames, startYear)
    )

    const results = await Promise.all(promises)

    const tidyData = results
        .flatMap((countryData) => countryData)
        .filter(Boolean)

    console.log('Tidy Data:', tidyData)

    // Here you can use the tidyData for further processing or visualization
}

main()
