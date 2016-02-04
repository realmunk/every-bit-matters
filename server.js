var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

io.on('connect', function (socket) {
    console.log('Looksies! We got ourselves a user!');
});

app.use('/', express.static('client'));

http.listen(port, function () {
    console.log('Server running on http://localhost:' + port + '/');
});