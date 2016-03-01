var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
    console.log(document.getElementsByTagName("tr")[0].id)
});

socket.on('client:display', function (results) {
    var latlon = {lat: results[0].lat,  lng: result[0].lon};
    var marker = new google.maps.Marker({
        position: latlon,
        map: map,
        name: results[0].ip
    });

    /*
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
        var mac = document.createElement("td");
        // add content to columns
        date.textContent = (new Date(result.date)).toLocaleString();
        ping.textContent = result.ping;
        download.textContent = result.download;
        upload.textContent = result.upload;
        ip.textContent = result.ip;
        // append columns to row
        tr.appendChild(date);
        tr.appendChild(ping);
        tr.appendChild(download);
        tr.appendChild(upload);
        tr.appendChild(ip);
        // append row to tbody
        tbody.appendChild(tr);
    });*/

});

function initMap() {
    var myLatLng = {lat: 63.363, lng: 10.044};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

}