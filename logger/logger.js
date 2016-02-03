var speedtest = require('speedtest-net'),
    fileSystem = require('fs'),
    fileName = __dirname + '/history.json',
    history = JSON.parse(fileSystem.readFileSync(fileName)),
    socket = require('socket.io-client')(process.argv[2] || 'http://localhost:3000');

socket.on('connect', function () {
    console.log('Logger is connected!');
});

socket.on('logger:history', function () {
    socket.emit('logger:results', history);
});

socket.on('logger:run', function () {

    var test = speedtest();

    console.log('Starting speedtest...');

    test.on('data', function (data) {
        var result = {
            download: data.speeds.download,
            upload: data.speeds.upload,
            ping: data.server.ping,
            date: Date.now()
        };

        history.push(result);
        socket.emit('speedtest:results', history);

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
});