async function fetchAndTransform(name, variableToGetArray, yearFrom) {

    const data = await aq.load(`../data/countries/WID_data_${name}.csv`, { delimiter: ';' }, { using: aq.fromCSV });

    const result = variableToGetArray.reduce((acc, cur, i) => {
        
      if (!acc) {  
        const filteredTable = data
        .filter(aq.escape((d) => d.year >= yearFrom && d.variable === cur)) 
        .select("country", "value", "year", "variable")
        // console.log(filteredTable.objects())
        return filteredTable        
    }
      else {
        const filteredTable = data.filter(aq.escape((d) => d.year >= yearFrom && d.variable === cur))
        .select("country", "value", "year", "variable"); 
        // console.log(filteredTable.objects())
        return acc.join_full(filteredTable, [["year"], ["year"]])

    }

    }, null);

    return result.object();

}

async function main() {

    const countryNames = [ "AU",  "DE",
    // "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AN", "AO", "AR", "AS", "AT", "AU", "AZ", "AW", 
    // "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BW", "BY", "BZ", 
    // "CA", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CS", "CU", "CV", "CY", "CZ", "CW",
    // "DE", "DJ", "DK", "DO", "DM", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", 
    // "GA", "GB", "GD", "GE", "GG", "GH", "GI", "GL", "GM", "GN", "GQ", "GR", "GT", "GU", "GW", "GY", 
    // "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IM", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", 
    // "KI", "KE", "KG", "KH", "KM", "KN", "KP", "KR", "KS", "KW", "KY", "KZ",
    // "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY",
    // "MA", "MC", "MD", "ME", "MH", "MG", "MK", "ML", "MP", "MM", "MN", "MO", "MR", "MS", "MT",
    // "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG", "NI", "NL",
    // "NO", "NP", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PR",
    // "PS", "PT", "PW", "PY", "QA", "QB", "RO", "RS", "RU", "RW", "SA", "SB", 
    // "SC", "SD", "SE", "SG", "SH", "SI", "SK", "SL", "SM", "SN", "SO",
    // "SR", "SS", "ST", "SU", "SV", "SW", "SX", "SY", "SZ", "TC", "TD", "TG", "TH",
    // "TJ", "TK", "TL", "TM", "TN", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US",
    // "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WO", "WS",
    // "XS", "YE", "YU", "ZA", "ZM", "ZW", "ZZ"
];

    const promises = countryNames.map(d => fetchAndTransform(d, ["npopuli999", "xlcyuxi999", "kifghgi999"], "1980"))

    const result = await Promise.all(promises)

    let data_total = result.flatMap(d => d);
    console.log(data_total);

    // const data_total_csv = d3.csvFormat(data_total, ["year", "country", "variable", "value"]);
    // console.log(data_total_csv);
}

main();
