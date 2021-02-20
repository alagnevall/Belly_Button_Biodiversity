//read in the data using d3


d3.json("samples.json").then(function(data){
console.log(data)
    var selector = d3.select("#selDataset");

    data.names.forEach(function(choose, index){
        var option = selector.append("option");
        option.text(choose);
        option.attr("value", index);
    })
    optionChanged(0);
});

function optionChanged(result){
    d3.json("samples.json").then(function(data){
        var subject = data.samples[result];

        // top10 = top10.slice(0,10);
// console.log(top10);
// console.log(subject.sample_values.slice(0,10));
console.log(subject.otu_ids.slice(0,10));
var trace1 = {
    x: subject.sample_values.slice(0,10).reverse(),
    y: subject.otu_ids.slice(0,10).reverse().map(d => "OTU " + d),
    // y: ["a","b","c","d","e","f","g","h","i","j"],
    text: subject.otu_labels,
    name: "put a title",
    type: "bar",
   orientation: "h"
};
var layout = {
    title: "TOP 10 OTUs",
    width: "auto",
    margin: {
      l: 100,
      r: 0,
      t: 100,
      b: 100
    }
};    
var chartData = [trace1];
Plotly.newPlot("bar", chartData, layout);

var trace2 = {
    y: subject.sample_values,
    x: subject.otu_ids,
    mode: "markers",
    marker: {
        size: subject.sample_values,
        color: subject.otu_ids
        // sizemode: "area"
    },
    text: subject.otu_labels
        
}
var layout2 = {
    title: "Bubbles",
    margin: {
      l: 100,
      r: 0,
      t: 100,
      b: 100
    }
}
var bubbleData = [trace2]
Plotly.newPlot("bubble", bubbleData, layout2);

var meta = data.metadata[result];
console.log(Object.keys(meta))
console.log(Object.values(meta))

var subjectData = d3.select("#sample-metadata");


// Object.entries(meta).forEach(function(key, value){
//     subjectData.append("p")
//     .text(key + ": " + value)

subjectData.selectAll("p").remove()

// })
for (const [key, value] of Object.entries(meta)) {
//   console.log(`${key}: ${value}`);
  subjectData.append("p")
    .text(key + ": " + value)
};






    });
};
