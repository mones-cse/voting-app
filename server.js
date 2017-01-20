//========= module ==============//
const morgan  = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');

//===== auth ========//
const cookie_parser=require('cookie-parser');
const session      =require('express-session');
const passport     =require('passport');
const connect_flash=require('connect-flash');
require('./config/passport')(passport);

//========= mongoose connection ==============//

var config =require(('./config/database'));
const mongoose =require('mongoose');
mongoose.connect(config.url);

//========= express app ==============//

const express = require('express');
var app = express();
app.set('port',process.env.PORT||8080);
app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookie_parser());                           // read cookies (needed for auth)
app.use(session({secret:'anystringoftext',          // for session
                saveUninitialized:true,
                resave:true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(connect_flash());
//========= routes ==============//

require('./app/routes')(app,passport);

//========= server connection ==============//

app.listen(app.get('port'),function(err){
    if(err){
        throw err;
    }
    console.log('server is runing at '+app.get('port'))
})