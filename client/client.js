var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
    var canvas = document.createElement("canvas");
    canvas.id = 'canvas';
    canvas.setAttribute("width", screen.availWidth);
    canvas.setAttribute("height", screen.availHeight);
    canvas.setAttribute("style", "position: relative; x:0; y:0;");
    document.body.appendChild(canvas);
});

socket.on('client:display', function (results) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var y = results[1] - 200
    ctx.fillRect(results[0],y,10,10);
    console.log(results[0])

});
