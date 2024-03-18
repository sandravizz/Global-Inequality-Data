/* Await calls need to be wrapped in an async function.
Async/await is a simpler way to write javascript promises. 
A javascript promise wrapper around a function that we don't know how long it will take.
If a function that takes a long time to run does not have promise wrapped around it will block the browser and the whole webpage will be "frozen".*/

// Do the main work of the code in this function
async function main() {

    // Await for function call to finish before proceeding to the next line of code
    const data = await aq.load("./WID_data_DE.csv", { using: aq.fromCSV });

    data.derive({
        unit: (d) => op.slice(d.variable, 0, 1)
      })
      .filter((d) => d.unit === "g" && d.variable === "ghwealj992")
      .print(5);
    // console.log(data);

    // Transforming to an array of objects
    let Ger = data.derive({
        unit: (d) => op.slice(d.variable, 0, 1)
      })
      .filter((d) => d.unit === "g" && d.variable === "ghwealj992")
      .objects();
    console.log(Ger);

}

// call the main function when script is loaded.
main();







