
async function PT() {

  const PT = await aq.load("./data/countries/WID_data_PT.csv", { using: aq.fromCSV });

    PT.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .print(5);

  let PT_g = PT.derive({
        unit: (d) => op.slice(d.variable, 0, 1)
      })
      .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
      .objects();
    console.log(PT_g);

}

PT();

async function DE() {

  const DE = await aq.load("./data/countries/WID_data_DE.csv", { using: aq.fromCSV });

    DE.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.variable === "ghwealj992")
    .print(5);

  let DE_g = DE.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.variable === "ghwealj992")
    .objects();
   console.log(DE_g);

}

DE();

async function main() {

  const PT = await aq.load("./data/countries/WID_data_PT.csv", { using: aq.fromCSV });
  const DE = await aq.load("./data/countries/WID_data_DE.csv", { using: aq.fromCSV });
  const US = await aq.load("./data/countries/WID_data_US.csv", { using: aq.fromCSV });  
  const GB = await aq.load("./data/countries/WID_data_GB.csv", { using: aq.fromCSV });
  const SE = await aq.load("./data/countries/WID_data_SE.csv", { using: aq.fromCSV });  
  
    PT.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .print(5);

    DE.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.variable === "ghwealj992")
    .print(5);

    US.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .print(5);

    GB.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .print(5);

    SE.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .print(5);

  let PT_g = PT.derive({
        unit: (d) => op.slice(d.variable, 0, 1)
      })
      .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
      .objects();
    console.log(PT_g);

  let DE_g = DE.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.variable === "ghwealj992")
    .objects();
   console.log(DE_g);

  let US_g = US.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .objects();
   console.log(US_g);

  let GB_g = GB.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .objects();
    console.log(GB_g);

  let SE_g = SE.derive({
      unit: (d) => op.slice(d.variable, 0, 1)
    })
    .filter((d) => d.unit === "g" && d.year > "1994" && d.variable === "ghwealj992")
    .objects();
    console.log(SE_g);

}

main();












