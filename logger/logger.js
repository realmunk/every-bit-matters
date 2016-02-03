var speedtest = require('speedtest-net'),
    fileSystem = require('fs'),
    test = speedtest(),
    io = require('socket.io-client')('http://localhost:3000/'),
    fileName = __dirname + '/history.json',
    history = JSON.parse(fileSystem.readFileSync(fileName));

io.on('connect', function () {
    console.log('Speedtester is connected!');
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