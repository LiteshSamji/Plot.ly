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

function optionChanged(selectednumber) {
    d3.json("samples.json").then(function (data) {
        var filtereddata = data.samples.filter(row => row.id == selectednumber)
        console.log(filtereddata)
        Barchart(filtereddata[0])
        var barfilteredmeta = data.metadata.filter(row => row.id == selectednumber)
        demoinfo(barfilteredmeta[0])
    })
}

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
        barmode: 'stack',
        xaxis: { title: "" },
        yaxis: { title: "" },
        width: 600
    }
        Plotly.newPlot("bar", trace1, layout);
}

function Bubbledata(tableData) {
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
            size: sample_values
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Bacteria',
        xaxis: { title: "" },
        yaxis: sample_values,
        showlegend: false,
        height: 600,
        width: 1000
    };

    Plotly.newPlot('bubble', data, layout);
}
function init() {
    var dropdown = d3.select("#selDataset") //referencing back to html  and appending dropdown
    d3.json("samples.json").then(function (data) {
        data.names.forEach((person) => {
            dropdown.append("option")
                .text(person)
                .property("value", person)
        })
        //line 17 starts looking at names list with ids. then looping through the people on list
        var initialdata = data.samples[0]
        console.log(data);
        Barchart(initialdata)
        var metadata = data.metadata[0]
        demoinfo(metadata)
    });
}
init()