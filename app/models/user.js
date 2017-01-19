const mongoose =require('mongoose');

var userSchema = new mongoose.Schema({
    title:String,
    options:Array
})

module.exports= mongoose.model('User',userSchema,'users');