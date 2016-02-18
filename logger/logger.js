var speedtest = require('speedtest-net');
var fileSystem = require('fs');
var fileName = __dirname + '/history.json';
var history = JSON.parse(fileSystem.readFileSync(fileName));
var socket = require('socket.io-client')(process.argv[2] || 'http://localhost:3000');
var num_speedtests = 0;
var tot_speedtests = 0;

socket.on('connect', function () {
    console.log('Logger is connected');
});

socket.on('logger:history', function () {
    socket.emit('server:results', history);
});

socket.on('logger:run', function () {
    //if(num_speedtests < 1){
        num_speedtests++;
        tot_speedtests++;
        console.log('Starting speedtest #'+tot_speedtests);
        
        var test = speedtest();

        test.on('data', function (data) {
            var result = {
                download: data.speeds.download,
                upload: data.speeds.upload,
                ping: data.server.ping,
                date: Date.now()
            };

            history.push(result);
            socket.emit('server:results', history);

            var jsonResult = JSON.stringify(history);
            fileSystem.writeFile(fileName, jsonResult, function (err) {
                if (err) {
                    console.log('Something went wrong: ' + err);
                } else {
                    console.log('Speedtest finished with '+num_speedtests+' tests running');
                }
            });
            num_speedtests--;
        });

        test.on('error', function (err) {
            console.error(err);
            num_speedtests--;
        });
    //}
});