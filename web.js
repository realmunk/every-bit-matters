var express = require('express');
var app = express();

app.use('/', express.static('client'));

app.listen(3000, function callback () {
    console.log('Running our app at http://localhost:3000')
});