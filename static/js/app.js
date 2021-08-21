//Step 1 - Use the D3 library to read in samples.json
function init() {
    var dropdown = d3.select("#selDataset") 
    d3.json("samples.json").then(function (data) {
        data.names.forEach((person) => {
            dropdown.append("option")
                .text(person)
                .property("value", person)
        })
        //Use first ID as default
        var initialdata = data.samples[0]
        //console.log(data);
        Barchart(initialdata)
        Bubblechart(initialdata)
        var metadata = data.metadata[0]
        demoinfo(metadata)
        Gaugechart(metadata)
    });
}

//Step 2 Create a horizontal bar chart with a dropdown menu to display 
//the top 10 OTU's found in that individual
function Barchart(tableData) {
    console.log(tableData.otu_ids.map(function (otu) {
        return "OTU " + otu
    }))
    var number = tableData.sample_values.slice(0, 10);
    var slice = tableData.otu_ids.map(function (otu) {
        return "OTU " + otu
    }).slice(0, 10)
    console.log(slice)
    var otu_label = tableData.otu_labels
        var trace1 = [{
        text: otu_label.reverse(),
        type: 'bar',
        x: number.reverse(),
        y: slice.reverse(),
        orientation: 'h'
    }];
    var layout = {
    title: 'Top 10 Bacteria Cultures Found',
    xaxis: { title: "Bacteria Sample Values" },
    yaxis: { title: "OTU IDs" }
    };
     // Display plot
    Plotly.newPlot("bar", trace1, layout);
}

//Step 3 - Create a bubble chart that display's each sample
function Bubblechart(tableData) {
    // Define samples
    var otu_label = tableData.otu_labels
    var number = tableData.sample_values
    var otu_id = tableData.otu_ids
    var sample_values = tableData.sample_values
    var trace1 = {
        x: otu_id,
        y: number,
        text: otu_label,
        mode: 'markers',
        marker: {
            color: otu_id,
            size: sample_values,
            colorscale: 'Earth'          
        }
    };
    // Create the trace
    var data = [trace1];
    var layout = {
        title: 'Belly button Samples',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'sample_values'},     
    };
     // Display plot
    Plotly.newPlot('bubble', data, layout);

}//Advanced Challenge
function Gaugechart(tabledata) {
// GAUGE CHART
        // Create variable for washing frequency
        var washFreq = tabledata.wfreq

        // Create the trace
        var gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                title: { text: "Washing Frequency (Times per Week)" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: {color: 'green'},
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 2], color: 'rgb(255,255,217)' },
                        { range: [2, 4], color: 'rgb(237,248,217)' },
                        { range: [4, 6], color: 'rgb(199,233,180)' },
                        { range: [6, 8], color: 'rgb(127,205,187)' },
                        { range: [8, 9], color: 'rgb(65,182,196)' },
                    ],                  
                }
            }
        ];

        // Define Plot layout
        var gauge_layout = { width: 550, height: 400, margin: { t: 0, b: 0 } };

        // Display plot
        Plotly.newPlot('gauge', gauge_data, gauge_layout);
}
    
    //Step 4 Display the sample metadata i.e an individual's demographic information
// Display each key-value pair from the metadata JSON object somewhere on the page.
function demoinfo(tableData) {
    console.log(tableData)
    var ul = d3.select("#sample-metadata");
    //clear panel
    ul.html("") 
    Object.entries(tableData).forEach(([keys, value]) => {
        ul.append("h5").text(`${keys} : ${value}`)
        console.log(keys, value)
    });
}

//Change the graphs when Patient Id is changed.
function optionChanged(selectedID) {
    d3.json("samples.json").then(function (data) {
        var filtereddata = data.samples.filter(row => row.id == selectedID)
        console.log(filtereddata)
        Barchart(filtereddata[0])
        Bubblechart(filtereddata[0])
        var filteredmeta = data.metadata.filter(row => row.id == selectedID)
        demoinfo(filteredmeta[0])
        Gaugechart(filteredmeta[0])
    })
}

// call the init() function for default data
init();