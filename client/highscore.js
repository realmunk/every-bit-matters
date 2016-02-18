var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
});

socket.on('client:display', function (results) {

    var tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    results.forEach(function (result) {
        var trlist = document.getElementsByTagName("tr");
        var tbodylist = document.getElementsByTagName("tbody");
        var newtrlist = [];

        var rank = document.createElement('td');
        var ping = document.createElement('td');
        var download = document.createElement('td');
        var upload = document.createElement('td');
        var ip = document.createElement('td');
        rank.textContent = "1";
        ping.textContent = result.ping;
        download.textContent = result.download;
        upload.textContent = result.upload;
        ip.textContent = result.ip;



        for(i = 0;i < trlist.length; i++){
            newtrlist.append(document.createElement("tr"));
            newtrlist.append(document.createElement("tr"));
            newtrlist.append(document.createElement("tr"));

            if (trlist[i].id == "pi"){
                newtrlist[i].appendChild(rank);
                newtrlist[i].appendChild(ping);
                newtrlist[i].appendChild(ip);
                tbodylist[i].appendChild(newtrlist[0])
            }
            else if(trlist[i].id == "down"){
                newtrlist[i].appendChild(rank);
                newtrlist[i].appendChild(download);
                newtrlist[i].appendChild(ip);
                tbodylist[i].appendChild(newtrlist[0])
            }
            else if(trlist[i].id == "up"){
                newtrlist[i].appendChild(rank);
                tnewtrlist[i].appendChild(upload);
                newtrlist[i].appendChild(ip);
                tbodylist[i].appendChild(newtrlist[0])
            };
        };
    });

});
