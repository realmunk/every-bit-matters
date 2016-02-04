var socket = io();

socket.on('connect', function (data) {
   console.log("I am connected");
});