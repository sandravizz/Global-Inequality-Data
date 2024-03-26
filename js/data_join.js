
async function loading() {
  
  const info_countries = await aq.load(`../data/WID_countries.csv`, { delimiter: ',' }, { using: aq.fromCSV });
  console.log("fetched", info_countries);

  const gini_countries = await aq.load(`../data/gini_1995-2022_all.csv`, { delimiter: ',' }, { using: aq.fromCSV });
  console.log("fetched", gini_countries);

  gini_countries.join(info_countries, ["country", "alpha2"]);

  let gini_all = gini_countries.join(info_countries, ["country", "alpha2"])
  .objects();
  console.log(gini_all);

  const string2 = d3.csvFormat(gini_all, ["unit", "year", "country", "variable", "value", "shortname", "titlename", "region", "region2"]);
  console.log(string2);

};

loading();



















