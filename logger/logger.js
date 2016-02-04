var speedtest = require('speedtest-net');
var fileSystem = require('fs');
var test = speedtest();
var fileName = __dirname + '/history.json';
var history = JSON.parse(fileSystem.readFileSync(fileName));
var io = require('socket.io-client')('http://localhost:3000/');

io.on('connect', function () {
    console.log('Logger is connected');
});

console.log('Starting speedtest...');

test.on('data', function (data) {
    var result = {
        download: data.speeds.download,
        upload: data.speeds.upload,
        ping: data.server.ping,
        date: Date.now()
    };

    history.push(result);

    var jsonResult = JSON.stringify(history);
    fileSystem.writeFile(fileName, jsonResult, function (err) {
        if (err) {
            console.log('Something went wrong: ' + err);
        } else {
            console.log('Speedtest finished');
        }
    });
});

test.on('error', function (err) {
    console.error(err);
});