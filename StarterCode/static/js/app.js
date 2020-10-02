// Some of the code was derived from office hours and working together on process

// function to draw the bubble chart
function DrawBubbleChart(sampleID)
{
    // console.log(`DrawBubbleChart(${sampleID})`);
}

// function to draw the bar chart 
function DrawBarChart(sampleID)
{
    // console.log(`DrawBarChar(${sampleID})`);
}

// Show Metadata
function ShowMetadata(sampleID)
{
    console.log(`ShowMetadata(${sampleID})`);
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