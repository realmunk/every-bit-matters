var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
});

socket.on('client:display', function (results) {

    var tbody = document.getElementsByTagName('tbody');
    for(i = 1; i < tbody.length; i++){
        tbody[i].innerHTML = '';
    }

    var tr = document.getElementsByTagName("tr");

    function getMax(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        };
        return max;
    };

    function getMin(arr, prop) {
        var min;
        for (var i=0 ; i<arr.length ; i++) {
            if (!min || parseInt(arr[i][prop]) < parseInt(min[prop]))
                min = arr[i];
        };
        return min;
    };

    var maxD = getMax(results, "download");
    var maxU = getMax(results, "upload");
    var minP = getMin(results, "ping");
    console.log(maxD);
    console.log(maxU);
    console.log(minP);

    var pingtr = document.createElement("tr");
    var downloadtr = document.createElement("tr");
    var uploadtr = document.createElement("tr");

    function addToCorrectHighscore(){

    }

    for(i = 0; i < tr.length; i++){
        var rank = document.createElement("td")
        var date = document.createElement("td");
        var ping = document.createElement("td");
        var download = document.createElement("td");
        var upload = document.createElement("td");
        var ip = document.createElement("td");
        if(i == 0){
            rank.textContent = "1";
            ip.textContent = minP.ip;
            date.textContent = (new Date(minP.date)).toLocaleString();
            ping.textContent = minP.ping;

            tr[i].appendChild(rank);
            tr[i].appendChild(ping);
            tr[i].appendChild(ip);
            tr[i].appendChild(date);

            tbody[i].appendChild(tr[i]);

        }
        else if(i == 1){
            rank.textContent = "1";
            ip.textContent = maxD.ip;
            date.textContent = (new Date(maxD.date)).toLocaleString();
            download.textContent = maxD.download;

            tr[i].appendChild(rank);
            tr[i].appendChild(download);
            tr[i].appendChild(ip);
            tr[i].appendChild(date);

            tbody[i].appendChild(tr[i]);

        }
        else if(i == 2){
            rank.textContent = "1";
            ip.textContent = maxU.ip;
            date.textContent = (new Date(maxU.date)).toLocaleString();
            upload.textContent = maxU.upload;

            tr[i].appendChild(rank);
            tr[i].appendChild(upload);
            tr[i].appendChild(ip);
            tr[i].appendChild(date);

            tbody[i].appendChild(tr[i]);

        }

    }
    

});
