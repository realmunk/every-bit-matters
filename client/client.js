var socket = io();
var marks = [];
var markers = [];
var first = 0;

socket.on('connect', function (data) {
    console.log("I am connected");
    console.log(document.getElementsByTagName("tr")[0].id)
});



function initMap(){
    var myLatLng = {lat: 63.363, lng: 10.044};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

}



function setMarker(index){
    var position = {lat: parseFloat(marks[index].lat), lng: parseFloat(marks[index].lon)}
    var marker = new google.maps.Marker({
        position: position,
        setMap: map,
        title: marks[index].ip
    });
    return marker;
}



function addMarker(bool){
    var tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    var tr = document.createElement("tr");
    var ip = document.createElement('td');
    var ping = document.createElement('td');
    var download = document.createElement('td');
    var upload = document.createElement('td');
    ip.textContent = marks[marks.length-1].ip;
    ping.textContent = marks[marks.length-1].ping;
    download.textContent = marks[marks.length-1].download;
    upload.textContent = marks[marks.length-1].upload;
    tr.appendChild(ip);
    tr.appendChild(ping);
    tr.appendChild(download);
    tr.appendChild(upload);
    tbody.appendChild(tr);
    markers.push(setMarker(marks.length-1));
    }
    /*
    else{
        var table = document.getElementById("myTable");
        for (var i = 0, row; row = table.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                console.log(col);
            }
            /*
            if(row.cell[0] == marks[bool].ip){
                row.cell[1] = marks[bool].ping;
                row.cell[2] = marks[bool].download;
                row.cell[3] = marks[bool].upload;
            }

        }

    }*/




}

function checkLastTest(test) {
    var counter = 0;
    for (var i = 0; i < marks.length; i++) {
        if (marks[0].ip != test.ip) {
            counter += 1;
        }
        else{
            marks[i].ip = test.ip;
            return i;
        }
    }
    if (counter === marks.length) {
        marks.push(test);
        return true;
    }

}



socket.on('client:display', function (results) {
    if(results.length > 1){
        var lastTest = $(results).get(-1);
        console.log(lastTest);
        addMarker(checkLastTest(lastTest));

    }

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

