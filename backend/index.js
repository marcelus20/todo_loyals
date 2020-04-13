 /**
  * @author Felipe Mantovani
  */
 
 //NPM modules
const express    = require('express');
const logger     = require("morgan");
const cors       = require("cors");
const http       = require("http");
const bodyParser = require("body-parser");

const app        = express(); 
// //My own libraries
const config     = require('./lib/config');
const handlers   = require('./lib/handler');
const routes     = require('./lib/routes');

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(routes);






app.listen(config.serverSettings.port, ()=>{
    console.log(`Running ${config.serverSettings.name} on ${config.serverSettings.port} port`)
});
