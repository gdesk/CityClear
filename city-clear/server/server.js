const express = require('express');
const bodyParser = require('body-parser');
const routing = require('../router/routers.js')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routing);


var port = process.env.PORT || 5051;

app.listen(port, function() {
    console.log('Express server listening on port: ' + port)
});

app.use((err, req, res, next) => {
    if (err.isServer) {
      console.log(err);
    }
    return res.status(err.output.statusCode).json(err.output.payload);
  });