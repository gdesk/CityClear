const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const TWO_HOURS = 1000*60*60*2;
var cors = require('cors');

var app = express();


app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//var routesArray = ['/login', '/logout'];

app.use(session({
  secret: 'secret secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: TWO_HOURS
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routing = require('../routers/routing.js');
app.use(routing);


app.all('/*', function(req, res) {
  res.sendFile('index.html', { root: __dirname + '/public' });
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