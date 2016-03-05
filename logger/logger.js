var fileSystem = require('fs');
var robot = require("robotjs");

var fileName = __dirname + '/history.json';
var history = JSON.parse(fileSystem.readFileSync(fileName));
var socket = require('socket.io-client')(process.argv[2] || 'http://localhost:3000');
socket.on('connect', function () {
    console.log(socket.id);

});


socket.on('logger:run', function (users) {
    var mouse=robot.getMousePos();
    var pos = [mouse.x, mouse.y];
    if(users[socket.id][0] != pos[0] || users[socket.id][1] != pos[1]){
        console.log(users[socket.id][0] +'!='+ pos[0] +'or'+ users[socket.id][1] +'!='+ pos[1])
        socket.emit('server:result', pos);
    }

});

