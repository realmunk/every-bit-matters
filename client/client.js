var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
});

socket.on('speedtest:display', function (data) {
    console.log(data);
});