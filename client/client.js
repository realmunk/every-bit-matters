var socket = io();
var marks = [];
/*
I Initially wanted to make it possible for several loggers to be on at the same time, showing all the different loggers on
both on the map, and in the list. I tried to differentiate between the different loggers with IP, but couldn't find a way to
update the existing logger info without adding extra fields in the list(like the example).

As of now, if several loggers tries to send their speedtests to this url: https://secure-inlet-73284.herokuapp.com/
The latest speedtest will be shown, no matter where it comes from. The marker will also change when the test-data changes.
 */

socket.on('connect', function (data) {
    console.log("I am connected");
});

//Google maps from the google maps API
var map;

//Initializes the map
function initMap(){
    //Trondheim - Gløshaugen
    var myLatLng = {lat: 63.363, lng: 10.044};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng,
    });

}


//Sets a marker on the map where the last speedtest came from.
function setMarker(index){
    var position = {lat: parseFloat(marks[index].lat), lng: parseFloat(marks[index].lon)}
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: marks[index].ip
    });
}


//Takes te last speedtest it receives and sends the info to the HTML.
//Last speedtest is always shown, both on the map, and the info about it.
function addMarker(bool) {
    var tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    var tr = document.createElement("tr");
    var ip = document.createElement('td');
    var ping = document.createElement('td');
    var download = document.createElement('td');
    var upload = document.createElement('td');
    ip.textContent = marks[marks.length - 1].ip;
    ping.textContent = marks[marks.length - 1].ping;
    download.textContent = marks[marks.length - 1].download;
    upload.textContent = marks[marks.length - 1].upload;
    tr.appendChild(ip);
    tr.appendChild(ping);
    tr.appendChild(download);
    tr.appendChild(upload);
    tbody.appendChild(tr);
    setMarker(marks.length - 1);
}

socket.on('client:display', function (results) {
    if(results.length > 1){
        var lastTest = $(results).get(-1);
        marks.push(lastTest);
        addMarker();

    }

});

