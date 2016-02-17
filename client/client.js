var socket = io();
var first = true;

socket.on('connect', function (data) {
    console.log("I am connected");
});

function itemToRow(item){
    var date = new Date(item.date);
    return '<tr><td>' + Math.floor(item.download) 
        + '</td><td>' + Math.floor(item.upload) 
        + '</td><td>' + Math.floor(item.ping) 
        + '</td><td>' + date + '</td></tr>';
}

function insertDataFieldsIntoIds(data){
    for (var i = arguments.length - 1; i >= 1; i--) {
        var id = arguments[i];
        $("#"+id).text(Math.floor(data[id]));
    };
}

socket.on('client:display', function (data) {
    var last = $(data).get(-1);

    insertDataFieldsIntoIds("download", "upload", "ping");

    if(first){
        var tr = '';
        for (var i = data.length - 1; i >= 0; i--) {
            tr += itemToRow(data[i]);
        };
        $('#history').prepend(tr);
    }else{
        $('#history').prepend(itemToRow(last));
    }
});