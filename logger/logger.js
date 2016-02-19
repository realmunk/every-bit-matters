var fileSystem = require('fs');
var robot = require("robotjs");

var fileName = __dirname + '/history.json';
var history = JSON.parse(fileSystem.readFileSync(fileName));
var socket = require('socket.io-client')(process.argv[2] || 'http://localhost:3000');
socket.on('connect', function () {

});


socket.on('logger:run', function (users) {
    var mouse=robot.getMousePos();
    var pos = [mouse.x, mouse.y];
    if(users[socket][0] != pos[0] || users[socket][1] != pos[1]){
        console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y + "start=" + users[socket][0]);
        socket.emit('server:result', pos);
    }

});

