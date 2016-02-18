var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
});

socket.on('client:display', function (results) {

    var tbody = document.getElementsByTagName('tbody');
    for(i = 1; i < tbody.length; i++){
        tbody[i].innerHTML = '';
    }


    results.forEach(function (result) {

        var tr = document.createElement("tr");
        var date = document.createElement("td");
        var ping = document.createElement("td")
        var download = document.createElement("td")
        var upload = document.createElement("td")
        var ip = document.createElement("td")
        var bestDate = document.createElement("td");
        var bestPing = document.createElement("td")
        var bestDownload = document.createElement("td")
        var bestUpload = document.createElement("td")
        var bestIp = document.createElement("td")

        date.textContent = (new Date(result.date)).toLocaleString();
        ping.textContent = result.ping;
        download.textContent = result.download;
        upload.textContent = result.upload;
        ip.textContent = result.ip;




    });

});
