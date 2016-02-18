var speedtest = require('speedtest-net');
var fileSystem = require('fs');
var robot = require("robotjs");

var fileName = __dirname + '/history.json';
var history = JSON.parse(fileSystem.readFileSync(fileName));
var socket = require('socket.io-client')(process.argv[2] || 'http://localhost:3000');

socket.on('connect', function () {

});

socket.on('logger:history', function () {
});

socket.on('logger:run', function () {
    var mouse=robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
    var pos = [mouse.x, mouse.y];

    socket.emit('server:result', pos);
});