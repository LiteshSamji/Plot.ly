function init() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
        //buildCharts(patientIDs[0]);
        DemoInfo(patientIDs[0]);
    });
};

function DemoInfo(patientID) {
    var InfoBox = d3.select("#sample-metadata");
    d3.json("samples.json").then(data => {
        var metadata = data.metadata
        var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]

        console.log(filteredMetadata)
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            InfoBox.append("p").text(`${key}: ${value}`)
        })
    })
}

function optionChanged(patientID) {
    console.log(patientID);
    DemoInfo(patientID);
}

init();