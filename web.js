var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

io.on('connect', function (socket) {

    console.log('Looksies! We got ourselves a user!');

});


app.use('/', express.static('client'));

http.listen(port, function callback () {
    console.log('Running our app at http://localhost:3000')
});