var socket = io();
var first = true;
var max_display_len = 100;
var chart;

socket.on('connect', function (data) {
    console.log("I am connected");
});

function pad(n){return n<10 ? '0'+n : n}

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

function init(data){

    var tr = '';
    var upload_series = [];
    var download_series = [];
    var ping_series = [];
    var first = Math.max(data.length - max_display_len, 0);

    for (var i = first; i < data.length - 1; i++) {
        var d = data[i];
        var dd = d.date;

        tr += itemToRow(d);
        download_series.push([dd, d.download]);
        upload_series.push([dd, d.upload]);
        ping_series.push([dd, d.ping]);

    };

    $('#history').prepend(tr);
    $("#history-table").tablesorter();

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'graph',
            defaultSeriesType: 'spline',
            zoomType: 'x',
            backgroundColor: 'transparent',
            zindex: '-1',
            panning: true,
            panKey: 'shift',
            events: {
                load: function (event){
                    this;
                }
            }
        },
        title: {
            text:""
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            //maxZoom: 20 * 1000,
            //min: $(download_series).get(0)[0],
            //max: $(download_series).get(-1)[0],
        },
        yAxis: {
            title: {
                text: 'MB/s'
            },
            visible: true,
            gridLineWidth: 0,
            opposite: true,
        },
        series: [{
            name: 'Download',
            data: download_series,
            color: '#F81810',
        }, {
            name: 'Upload',
            data: upload_series,
            color: '#F8D010',
            lineWidth: '1px',
            dashStyle: 'ShortDash',
        }]
    });

    
}

socket.on('client:display', function (data) {
    var last = $(data).get(-1);

    $("#download").text(Math.floor(last.download));
    $("#upload").text(Math.floor(last.upload));
    $("#ping").text(Math.floor(last.ping));

    if(first){
        init(data);
        first = false;
    }else{
        $('#history').prepend(itemToRow(last));
        $("#history-table").trigger("update"); 

        var shift = chart.series[0].data.length > 30;
        chart.series[0].addPoint([last.date, last.download], true, shift);
        chart.series[1].addPoint([last.date, last.upload], true, shift);

    }

    
    console.log("Got new speed", last);
});
