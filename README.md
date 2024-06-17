# Global inequality

In this repository I use mainly the js library [arquero](https://www.npmjs.com/package/arquero) to load, join and transform the data from the [World Inequality Database (WID)](https://wid.world/) for a new data visualisation and storytelling project. The objective of this project is to investigate the reasons and consequences of a rising global inequality.

## Loading.js

In this script all individual country files are loaded in order to combine them with the option to select different timeframes as well as variables.

The focus in a income inequality using two different measures

-   Gini
-   Ratio (10/50)

as well as analysing the differences pre and post taxes.

The correponding code can be found [here](js/loading.js).

## Join.js

In this script I join the complete file (output from the loading script) in order to join it with WID_countries.csv to add importat information about the countries.

In the second step I

-   select
-   rename
-   derive

the main variables.

[here](js/join.js).

Made with :green_heart: by [Patrick](https://www.linkedin.com/in/patrickwojda/) && [Sandraviz](https://www.sandraviz.com/bio) and support form [Austin](https://github.com/thataustin?tab=overview&from=2024-06-01&to=2024-06-12).

Follow me: [twitter](https://twitter.com/SandraCrypto), [linkedin](https://www.linkedin.com/in/sandradataviz/) and [observable](https://observablehq.com/@sandraviz)
