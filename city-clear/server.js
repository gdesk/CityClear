const express = require('express');
const session = require('express-session');
const serveStatic = require('serve-static');
const path = require('path')
const bodyParser = require('body-parser');
//const multer = require('multer');

const TWO_HOURS = 1000*60*60*2;

var app = express();

app.use(serveStatic(path.join(__dirname + '/dist')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'secret secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: TWO_HOURS
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routing = require('./routers/routing.js');
app.use(routing);


app.all('/*', function(req, res) {
  res.sendFile('index.html', { root: __dirname + '/dist' });
});

const port = process.env.PORT || 5051;
app.listen(port, function() {
    console.log('Express server listening on port: ' + port)
});

app.use((err, req, res, next) => {
    if (err.isServer) {
      console.log(err);
    }
    return res.status(err.output.statusCode).json(err.output.payload);
});