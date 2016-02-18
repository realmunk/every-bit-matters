var socket = io();

socket.on('connect', function (data) {
    console.log("I am connected");
});

socket.on('client:display', function (results) {

    var tbody = document.getElementsByTagName('tbody');
    for(i = 0; i < tbody.length; i++){
        console.log(document.getElementsByTagName("tbody")[i]);
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

    function addToCorrectHighscore(res){
        var column1 = document.createElement("td")
        var column2 = document.createElement("td");
        var column3 = document.createElement("td");
        var column4 = document.createElement("td");
        var ind = 0;

        if(res == maxD){
            ind = 1;
            column1.textContent = "1";
            column2.textContent = maxD.score;
            column3.textContent = maxD.ip;
            column4.textContent = (new Date(maxD.date)).toLocaleString();

        }
        else if(res == maxU){
            ind = 2;
            column1.textContent = "1";
            column2.textContent = maxU.score;
            column3.textContent = maxU.ip;
            column4.textContent = (new Date(maxU.date)).toLocaleString();

        }
        else if(res == minP){
            ind  = 0;
            column1.textContent = "1";
            column2.textContent = minP.score;
            column3.textContent = minP.ip;
            column4.textContent = (new Date(minP.date)).toLocaleString();

        }

        tr[ind].appendChild(column1);
        tr[ind].appendChild(column2);
        tr[ind].appendChild(column3);
        tr[ind].appendChild(column4)
        tbody[ind].appendChild(tr[ind]);
    }

    addToCorrectHighscore(maxD);
    addToCorrectHighscore(maxU);
    addToCorrectHighscore(minP);


});
