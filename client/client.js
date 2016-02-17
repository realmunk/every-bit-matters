var socket = io();
var first = true;

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


socket.on('client:display', function (data) {
    var last = $(data).get(-1);

    $("#download").text(Math.floor(last.download));
    $("#upload").text(Math.floor(last.upload));
    $("#ping").text(Math.floor(last.ping));

    if(first){
        var tr = '';
        for (var i = data.length - 1; i >= 0; i--) {
            tr += itemToRow(data[i]);
        };
        $('#history').prepend(tr);
        $("#history-table").tablesorter(); 
    }else{
        $('#history').prepend(itemToRow(last));
        $("#history-table").trigger("update"); 
    }

    
    console.log("Got new speed", last);
});
