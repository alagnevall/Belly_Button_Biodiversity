//read in the data using d3


d3.json("samples.json").then(function(data){

    var selector = d3.select("#selDataset");

    data.names.forEach(function(choose, index){
        var option = selector.append("option");
        option.text(choose);
        option.attr("value", index);
    })
});

function optionChanged(result){
    d3.json("samples.json").then(function(data){
        var subject = data.samples[result];

        // top10 = top10.slice(0,10);
// console.log(top10);
// console.log(subject.sample_values.slice(0,10));
console.log(subject.otu_ids.toString());
var trace1 = {
    x: subject.sample_values.slice(0,10),
    y: subject.otu_ids.toString(),
    text: subject.otu_labels,
    name: "put a title",
    type: "bar",
    orientation: "h"
};
var layout = {
    title: "Greek gods search results",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
};    
var chartData = [trace1];
Plotly.newPlot("bar", chartData, layout);

    })

}