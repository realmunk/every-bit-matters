var fileSystem = require('fs');

var fileName = __dirname + '/history.json';
var history = JSON.parse(fileSystem.readFileSync(fileName));
var socket = require('socket.io-client')(process.argv[2] || 'http://localhost:3000');

socket.on('connect', function () {

});

socket.on('logger:history', function () {
});

socket.on('logger:run', function () {

    socket.emit('server:result', pos);
});