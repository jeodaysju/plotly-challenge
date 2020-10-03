// Some of the code was derived from office hours and working together on process

// function to draw the bubble chart
function DrawBubbleChart(sampleID)
{
    // console.log(`DrawBubbleChart(${sampleID})`);

    d3.json("samples.json").then((data) => {

        // Get the names
        var sampleNames = data.names;

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            type: "scatter",
            mode: "markers",
            marker: {
                color: otu_ids,
                opacity: [1, 0.8, 0.6, 0.4],
                size: sample_values
            },
            text: otu_labels
        };
        var bubbleLayout = {
            title: "Sample Bacteria Cultures Found",
            margin:{t: 30, l: 150}
        };
        
        Plotly.newPlot("bubble", [bubbleData], bubbleLayout)

    });
 
}

// function to draw the bar chart 
function DrawBarChart(sampleID)
{
    // console.log(`DrawBarChar(${sampleID})`);
    // Load the data and then ...
    d3.json("samples.json").then((data) => {

        // Get the names
        var sampleNames = data.names;

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin:{t: 30, l: 150}
        }
        
        Plotly.newPlot("bar", [barData], barLayout)
        });

}

// Show Metadata
function ShowMetadata(sampleID)
{
    console.log(`ShowMetadata(${sampleID})`);

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleID);
        var result = resultArray[0];

        var panel = d3.select("#sample-metadata");
        panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);

        });

    });
}

// function for when drop down changes - this acts as event handler for optionChanged
function optionChanged(newSampleID)
{
    // console.log(`User Selected ${newSampleID}`);

    DrawBarChart(newSampleID);
    DrawBubbleChart(newSampleID);
    ShowMetadata(newSampleID);
}

// develop the init dashboard to initialize the page
function InitDashboard()
{
    var selector = d3.select("#selDataset");

    // Load the data and then ...
    d3.json("samples.json").then((data) => {
        console.log(data);

        // Get the names
        var sampleNames = data.names;

        // Populate the selector with all of the sample IDs
        sampleNames.forEach((sampleID) => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
        });

        // Get first sample ID
        var sampleID = sampleNames[0];
        // console.log("Starting sample: ", sampleID);

        // Draw Graphs
        DrawBarChart(sampleID);
        DrawBubbleChart(sampleID);

        // Display metadata
        ShowMetadata(sampleID);

    });
}

InitDashboard();