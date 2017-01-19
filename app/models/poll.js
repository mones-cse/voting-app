const mongoose =require('mongoose');

var pollSchema =mongoose.Schema({  
    title:String,
    options:[{_id:false,name:String, voteCount:Number}],
    creator:String,
    createdTime: Date
})

module.exports= mongoose.model('Poll',pollSchema,'polls');