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
    for (var key in results){
        var y = results[key][1] - 200;
        var x = results[key][0];
        var img= new Image();
        img.src = '/pointer.gif';
        ctx.drawImage(img,x,y);
        //ctx.fillRect(x,y,10,10);
    }


});

