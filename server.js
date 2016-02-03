var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var timeInterval = process.env.TIME_INTERVAL || 5000;


io.on('connect', function (socket) {

    console.log("Someone connected.");

    io.emit('logger:history');

    socket.on('logger:results', function (data) {
        io.emit('logger:display', data);
    });

});

setInterval(function () {

    io.emit('logger:run');

}, timeInterval);

app.use(express.static('client'));
app.use(express.static('node_modules/d3/'));

http.listen(port, function () {
    console.log('Running our app at http://localhost:3000')
});