//========= module ==============//
const morgan  = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');

//========= mongoose connection ==============//

var config =require(('./config/database'));
const mongoose =require('mongoose');
mongoose.connect(config.url);

//========= express app ==============//

const express = require('express');
var app = express();
app.set('port',process.env.PORT||8080);
app.set('view engine','ejs');
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

//========= routes ==============//

require('./app/routes')(app);

//========= server connection ==============//

app.listen(app.get('port'),function(err){
    if(err){
        throw err;
    }
    console.log('server is runing at '+app.get('port'))
})