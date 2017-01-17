const express = require('express');
const ejs = require('ejs');
var app = express();
var morgan  = require('morgan');
const bodyParser = require('body-parser')

app.set('port',process.env.PORT||8080);

app.set('view engine','ejs');
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))





require('./app/routes')(app);



app.listen(app.get('port'),function(err){
    if(err){
        throw err;
    }
    console.log('server is runing at '+app.get('port'))
})