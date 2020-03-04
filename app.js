const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./server/routes')

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('port', port);

routes(app);

const server = http.createServer(app);

server.listen(port);