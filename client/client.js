var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
});

socket.on('client:display', function (data) {
    console.log(data);
    drawGraph(data);
});

var data = [];

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var downloadLine = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.download); });

var uploadLine = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.upload); });

var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var _xAxis = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

var _yAxis = svg.append("g")
    .attr("class", "y axis");

_yAxis.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Speed (Mbps)");

var dlLine = svg.append("path")
    .attr("class", "download-line");

var ulLine = svg.append("path")
    .attr("class", "upload-line");

function drawGraph (data) {
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.download; })]);

    _xAxis
        .transition()
        .duration(500)
        .call(xAxis);

    _yAxis
        .transition()
        .duration(500)
        .call(yAxis);

    dlLine.datum(data)
        .transition()
        .duration(500)
        .attr("d", downloadLine);

    ulLine.datum(data)
        .transition()
        .duration(500)
        .attr("d", uploadLine);
};
