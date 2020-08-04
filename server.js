const port = 3004;
const enderecoSocket = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : 'wss://gamerx.com.br';

var http = require('http');
var path = require('path')
var express = require('express');
// var router = express.Router();
var cors = require('cors')
var cons = require('consolidate');
// var ejs = require('ejs');
//var db = require('./DB/db');
var bodyParser = require('body-parser');
var dust = require('dustjs-helpers');
var startGameServ = require('./startGameServ.js');
var skt = require('./socket.js');

var serverID = 2;
var serverName = "S2";

var jsonParser = bodyParser.json();
var app = express();
const server = require('http').createServer(app);

app.use(cors());
app.use(jsonParser);
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/startGameServ', jsonParser, (req, res) => {
  console.log('/startGameServ');
  startGameServ.startGame(req, res)
});

app.get('/', (req, res) => { console.log('teste'); res.send('<h1> home </h1>') });

app.post('/', (req, res) => { console.log('teste'); res.send('<h1> home </h1>') });

server.listen(port, () => {
  console.log('Server online on port ' + port);
  skt.socket.emit('login', { userid: serverID, username: serverName });
  // skt.socketEmit('login', { userid: serverID, username: serverName });
});

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(function (req, res, next) {
  var err = new Error('Error 404: Page not found!');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  })
}

// server.engine('ejs', ejs.renderFile);
// server.set('view engine', 'ejs');

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


module.exports = { 
  app, 
};