var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
});

socket.on('client:display', function (results) {

    var tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    results.forEach(function (result) {
        // add table row
        var tr = document.createElement('tr');
        // add columns
        var date = document.createElement('td');
        var ping = document.createElement('td');
        var download = document.createElement('td');
        var upload = document.createElement('td');
        var ip = document.createElement('td');
        // add content to columns
        date.textContent = (new Date(result.date)).toLocaleString();
        ping.textContent = result.ping;
        download.textContent = result.download;
        upload.textContent = result.upload;
        ip.textContent = result.ip;
        // append columns to row
        console.log(tr.id);
        tr.appendChild(date);
        tr.appendChild(ping);
        tr.appendChild(download);
        tr.appendChild(upload);
        tr.appendChild(ip)
        // append row to tbody
        tbody.appendChild(tr);
    });

});
