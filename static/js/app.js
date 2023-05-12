// BUILD METADATA SECTION

// Set the api url as a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Build a function called buildMetadata that takes in a parameter called sample
function buildMetadata(sample) {

  // Use d3 to pull in the data
  d3.json(url).then(function(data) {
    let metadata = data.metadata;  
    console.log(metadata);

    // Create a reference point to an array that takes in the id key equal to the sample parameter
    let idArray = metadata.filter(result => result.id == sample);

    // Create a new reference point indexing the 0 position of the previous reference point
    let idValue = idArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(idValue).forEach(([key, result]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${result}`);
      });
  });
};

// BUILD CHARTS SECTION

// Build a function called buildCharts that takes in a parameter called sample 
function buildCharts(sample) {
    
  // Use d3 to pull in the data
  d3.json(url).then(function(data) {

    // Create reference points for samples key
    let samples = data.samples;

    // Create a reference point to an array that takes in the id key equal to the sample parameter
    let idArray = samples.filter(result => result.id == sample);

    // Create a new reference point indexing the 0 position of the previous reference point
    let sampleValue = idArray[0];
   
    // Create a reference point for these keys: otu_ids, otu_labels, sample_values
    let otu_ids = sampleValue.otu_ids;
    let otu_labels = sampleValue.otu_labels;
    let sample_values = sampleValue.sample_values;

    // Create reference point yticks equal to a slice(0,10) of otu_ids in reverse order
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();    
    
    // Slice the first 10 objects for plotting
    let xticks = sample_values.slice(0,10).reverse();
    let labels = otu_labels.slice(0,10).reverse();
    
    // Create reference point called barData and define: y, x, text, type, orientation
    let trace1 = {
      x: xticks,
      y: yticks,
      text: labels,
      name: "topTen",
      type: "bar",
      orientation: "h"
    };
        
    let barData = [trace1];
    
    // Create reference point called barLayout and define: title, margin
    let barLayout = {
      title: "Top ten OTUs in sample",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      },
      width: 800,
    };
    
    // Use Plotly.newPlot and fill in parameters with defined objects above
    Plotly.newPlot("bar", barData, barLayout);
  });

  // Use d3 to pull in the data
  d3.json(url).then(function(data) {

    // Create reference points for samples key
    let samples = data.samples;

    // Create a reference point to an array that takes in the id key equal to the sample parameter
    let idArray = samples.filter(result => result.id == sample);

    // Create a new reference point indexing the 0 position of the previous reference point
    let sampleValue = idArray[0];
   
    // Create a reference point for these keys: otu_ids, otu_labels, sample_values
    let otu_ids = sampleValue.otu_ids;
    let otu_labels = sampleValue.otu_labels;
    let sample_values = sampleValue.sample_values;

    // Create and define bubbleData parameters: x, y, text, mode, marker {size, color, colorscale}
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        opacity: [1, 0.8, 0.6, 0.4],
        size: sample_values
      }
    };

    let bubbleData = [trace2];

    // Create and define parameters for bubble chart: title, margin (t: 0), hovermode ("closest"), xaxis (title: "OTU ID"), margin (t: 30)
    var bubbleLayout = {
      title: {
        text: "Distribution of OTU IDs for this sample",
        margin: {
          t: 0
        }
      },
      hovermode: "closest",
      showlegend: false,
      xaxis: {title: "OTU ID"}
    };

    // Use Plotly.newPlot and fill in parameters with defined objects above
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
};

// Create function to initalize dashboard HINT:init()
function init() {

  // Create reference point to the #selDataset id from the index.html file
  let DROPMENU = d3.select("#selDataset");

  // Use d3 to pull in the data
  d3.json(url).then(function(data) {

    // Create a reference point to data.names key
    let namesData = data.names;

    // Create a for loop for the length of reference point
    namesData.forEach((id) => {

      // Use append method to create a new "option" element for each sample name
      DROPMENU.append("option")
      // Use text method with reference point for "option" data.names key
      .text(id)
      // Use property method with "value", reference point for data.names key as parameters
      .property("value",id);
      });

  // Create reference point called firstSample to pull in index 0 for data.names key
  let firstSample = namesData[0];

  // Use buildCharts function with firstSample as parameter
  buildCharts(firstSample);

  // Use buildMetadata function with firstSample as parameter
  buildMetadata(firstSample);
  });
};

// Create function called optionChanged that takes in a parameters called newSample
function optionChanged(newSample) {

  // Use buildCharts function with newSample as parameter
  buildCharts(newSample);
  // Use buildMetadata function with newSample as parameter
  buildMetadata(newSample);
};

// Initialize the dashboard
init();