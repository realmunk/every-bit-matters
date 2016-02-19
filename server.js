var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var interval = process.env.TIME_INTERVAL || 100;

var users = {};

io.on('connect', function (socket) {
    users[socket] = [0,0];
    console.log('Looksies! We got ourselves a user!');
    console.log(users)

    socket.on('server:result', function (data) {
        console.log("server:result");
        users[socket] = [data[0],data[1]];

    });

    setInterval(function () {
        io.emit('client:display', users);
    }, 500);

});



setInterval(function () {
    io.emit('logger:run', users);
}, interval);

app.use('/', express.static('client'));
app.use('/', express.static('node_modules/d3'));

http.listen(port, function () {
    console.log('Running our app at http://localhost:3000')
});