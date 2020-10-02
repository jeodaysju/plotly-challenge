// Some of the code was derived from office hours and working together on process


function DrawBubbleChart(sampleID)
{
    console.log(`DrawBubbleChart(${sampleID})`);
}

function DrawBarChart(sampleID)
{
    console.log(`DrawBarChar(${sampleID})`);
}

function optionChanged(newSampleID)
{
    console.log(`User Selected ${newSampleID}`);

    DrawBarChart(newSampleID);
    DrawBubbleChart(newSampleID);

}

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
        console.log("Starting sample: ", sampleID);

        // Draw Graphs
        DrawBarChart(sampleID);
        DrawBubbleChart(sampleID);

    });
}

InitDashboard();