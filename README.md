# Global_inequality

Using the world inequality database (WID) for analysis. 

## Data | arquero.js

We use npm to install arquero.js, please find the documentation [here](https://www.npmjs.com/package/arquero) 

### Loading 

The database offers the information by one file for each country. So the first step was to load the files and create one final file, which includes all data for the years and value (in this case gini) we want. 
The correponding code can be found [here](js/load_all_data.js). 

### Join 

Afterwards we want to add all relavant country information to this final file. The correponding code can be found [here](js/data_join.js).

### Wrangeling 

Afterwards for running the first visualisations, we need to change the data format, filter, aggregate etc. The correponding code can be found [here](js/data_wrangeling.js). 

## EDA | plot.js

We use npm to install plot.js, please find the documentation [here](https://www.npmjs.com/package/@observablehq/plot) 

## Visualisation | d3.js 

We use npm to install d3.js, please find the documentation [here](https://www.npmjs.com/package/d3) 

### Timeline scatter plot 

The first visualisation that I did was a timeline scatterpot by region. The correponding code can be found [here](js/timeline_scatterplot.js).



