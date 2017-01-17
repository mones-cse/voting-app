const express = require('express');
const ejs = require('ejs');
var app = express();
var morgan  = require('morgan')

app.set('port',process.env.PORT||8080);

app.set('view engine','ejs');
app.use(morgan('dev'))




require('./app/routes')(app);



app.listen(app.get('port'),function(err){
    if(err){
        throw err;
    }
    console.log('server is runing at '+app.get('port'))
})