var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var interval = process.env.TIME_INTERVAL || 200;

var users = {};

io.on('connect', function (socket) {
    console.log(socket.id.substr(2));
    users[socket.id.substr(2)] = [0,0];
    console.log('users:'+Object.keys(users).length)

    socket.on('server:result', function (data) {
        users[socket.id.substr(2)] = [data[0],data[1]];

    });

    socket.on('disconnect', function() {
        console.log('Got disconnect!');
        delete users[socket.id.substr(2)];
    });

});



setInterval(function () {
    io.emit('logger:run', users);
    io.emit('client:display', users);
}, interval);

app.use('/', express.static('client'));
app.use('/', express.static('node_modules/d3'));

http.listen(port, function () {
    console.log('Running our app at http://localhost:3000')
});