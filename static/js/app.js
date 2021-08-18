// select the user input field
var idSelect = d3.select("#selDataset");

function init() {
    // D3 library to read in sample data
    d3.json("samples.json").then((data => {
    console.log(data);    
        //Insert the 
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        })); 
        // get the first ID from the list for initial charts as a default
        var initId = idSelect.property("value")

        // plot charts with initial ID
        //plotCharts(initId);

    })); // close .then()

} // close init() function

// create a function to reset divs to prepare for new data
function resetData() {

    // ----------------------------------
    // CLEAR THE DATA
    // ----------------------------------

    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
    gaugeChart.html("");

}; // close resetData()

// call the init() function for default data
init();