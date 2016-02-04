var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


app.use('/', express.static('client'));

app.listen(port, function callback () {
    console.log('Running our app at http://localhost:3000')
});