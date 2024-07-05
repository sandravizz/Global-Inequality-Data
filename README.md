# Global inequality

This is a data driven project about global inequality.

## Background

Something isn't going well in current, modern, western societies. I feel it, my friends feel it, people around us and in the world are struggeling. More and more do we hear about our democracies failing, our communities splitting and inequalities rising.

In order to invesitgate about this preceived development Patrick and I decided to have a deeper and as it turns out a very deep look at data about global inequality.

## Data warngling

Using data from the [World Inequality Database (WID)](https://wid.world/) we use mainly the js library [arquero](https://www.npmjs.com/package/arquero) to load, join and transform data. The objective of this project is to investigate the reasons and consequences of a rising global inequality.

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

Made with :green_heart: by && [Sandraviz](https://www.sandraviz.com/bio) and support form [Patrick](https://www.linkedin.com/in/patrickwojda/) and [Austin](https://github.com/thataustin?tab=overview&from=2024-06-01&to=2024-06-12).

Follow me: [twitter](https://twitter.com/SandraCrypto), [linkedin](https://www.linkedin.com/in/sandradataviz/) and [observable](https://observablehq.com/@sandraviz)
