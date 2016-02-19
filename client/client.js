var socket = io();
var chart;
var upload_series = [];
var download_series = [];
var ping_series = [];
var max_dl = 0;
var max_ul = 0;
var min_ping = 999999;

var max_display_len = 500;
var point_threshold = 500;
var anim_duration = 2000;

socket.on('connect', function (data) {
    console.log("I am connected");
});

function pad(n){return n<10 ? '0'+n : n}

//Convert speed test data to a table row
function itemToRow(item){
    var d = new Date(item.date);
    var time = pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
    var date = d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
    return '<tr><td>' + Math.floor(item.download) 
        + '</td><td>' + Math.floor(item.upload) 
        + '</td><td>' + Math.floor(item.ping) 
        + '</td><td>' + date
        + '</td><td>' + time + '</td></tr>';
}

//Init all elements
function init(data){
    var tr = '';
    var first = Math.max(data.length - max_display_len, 0);

    //Process data for table and graph
    for (var i = 0; i < data.length - 1; i++) {
        var d = data[i];
        var date = d.date;

        tr += itemToRow(d);

        //Don't add all points to graph, just the most recent ones
        if(i >= first){
            download_series.push([date, d.download]);
            upload_series.push([date, d.upload]);
            ping_series.push([date, d.ping]);
        }

        checkHighscore(d.download, d.upload, d.ping);
    };

    //Inject data into table
    $('#history').append(tr);
    $("#history-table").tablesorter();

    //Create graph with data from speed tests
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'graph',
            defaultSeriesType: 'spline',
            zoomType: 'x',
            backgroundColor: 'transparent',
            zindex: '-1',
            panning: true,
            panKey: 'shift',
        },
        title: { text:"" },
        credits: {
            text: 'Data from SpeedTest.net',
            href: 'http://www.speedtest.net'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
        },
        yAxis: [{
            title: { text: 'MB/s' },
            visible: false,
            gridLineWidth: 0,
            opposite: true,
        }, {
            title: { text: 'Milliseconds' },
            gridLineWidth: 0,
            visible: false,
        }],
        series: [{
            name: 'Download',
            data: download_series,
            color: '#F81810',
            zIndex: 2,
            lineWidth: '1px',
        }, {
            name: 'Upload',
            data: upload_series,
            color: '#F8D010',
            lineWidth: '1px',
            dashStyle: 'ShortDash',
            zIndex: 2,
        }, {
            name: 'Ping',
            type: 'column',
            data: ping_series,
            color: "#8CD5FF",
            yAxis: 1,
            zIndex: 1,
            pointWidth: 1,
            visible: false,

        }]
    });

    //Show legend on graph hover
    $('#graph').hover( function(){
        chart.yAxis[0].update({visible: true});
        chart.yAxis[1].update({visible: true});
    }, function(){
        chart.yAxis[0].update({visible: false});
        chart.yAxis[1].update({visible: false});
    });
}

function injectData(data){
    animateValueChange("#download", data.download);
    animateValueChange("#upload", data.upload);
    animateValueChange("#ping", data.ping);
}

function addPointsToGraph(data, shift){
    chart.series[0].addPoint([data.date, data.download], true, shift);
    chart.series[1].addPoint([data.date, data.upload], true, shift);
    chart.series[2].addPoint([data.date, data.ping], shift);
}

function checkHighscore(dl, ul, ping){
    if(dl > max_dl){
        max_dl = dl;
        $("#stat-download").text(Math.floor(dl));
    }
    if(dl > max_ul){
        max_ul = ul;
        $("#stat-upload").text(Math.floor(ul));
    }
    if(dl < min_ping){
        min_ping = ping;
        $("#stat-ping").text(Math.floor(ping));
    }
}

function animateValueChange(element, value){
    var prev = parseInt($(element).text());
    if(isNaN(prev)) prev = 0;

    //display cool +1 animation
    if(value > prev){

    } else {

    }

    $(element).prop('Counter', prev).animate({ Counter: value }, {
        duration: anim_duration,
        easing: 'swing',
        step: function (now) { $(element).text(Math.floor(now)); }
    });
}

/* TODO

countdown til next scan/progress of current scan
animate +5 / -3 text besides text, one by one, like hp red-> white, middle->bottom

*/

//get all historical speed test data
socket.on('client:display', function (data) {
    init(data);

    //make sure there is data to process
    if(data.length > 0) {
        var last = $(data).get(-1);
        injectData(last);
        console.log("Got historic data", data);
    } else {
        console.log("Empty history data. Waiting for next update.");
    }
});


//Get latest speed test data only
socket.on('client:update', function (data) {
    
    //Update current speed
    injectData(data);

    //Update table
    $('#history').prepend(itemToRow(data));
    $("#history-table").trigger("update");

    //Update graph
    var shift = chart.series[0].data.length > max_display_len;
    addPointsToGraph(data, shift);

    //Update stats
    checkHighscore(data.download, data.upload, data.ping);

    console.log("Got new speed", data);
});
