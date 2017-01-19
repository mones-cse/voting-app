var Poll =require('./models/poll');

module.exports= function(app){
   
    app.get('/',function(req,res){
        Poll.find({},function(err,polls){
        if(err){
            throw err;
        }
        res.render('home',{polls:polls});
    })       
    })

    app.get('/newpoll',function(req,res){
        res.render('newpoll');
    })

    app.post('/newpoll',function(req,res){
        var newPoll = new Poll();
        console.log('qqqqq',req.body);
        newPoll.title =req.body.title;
        var optionsArray =req.body.options.split('\r\n');        
        newPoll.options = optionsArray.map(function(eachData){
	        return {name:eachData,voteCount:0};
        });
        newPoll.save(function(err,data){
            if(err){
                return err;
            }
            res.redirect('/');
        })        
    })

    app.get('/mypoll',function(req,res){
        res.render('mypoll');
    })

    app.get('/poll/:id',function(req,res){     
        Poll.findById(req.params.id,function(err,poll){
            if(err){
                throw err;
            }else{
                if(poll){
                    res.render('pollDisplay',{poll:poll});
                }
                 
            }
        })
    })

    app.post('/voteAdd',function(req,res){
        //console.log('?????',req.body);//{ pollId: '5880ecd26fe9991ef00a1523', pollSelectedValue: 'legand ' }
        //find match
         Poll.findOne({_id:req.body.pollId},function(err,poll){
             if(err){
                 throw err
             }
             if(poll){  
                  //find for existed option 
                  var index = poll.options.findIndex(function(eachOption){
                        return eachOption.name === req.body.pollSelectedValue;
                    })


                 if(index>-1){
                //if match update count                 
                console.log('enterd');
                    poll.options[index].voteCount++;
                 }else{
                //else insert new data 
                    poll.options.push({name:req.body.pollSelectedValue,voteCount:0})
                 }
                 console.log(poll);
                 //save 
                //reload 
             }

         })
       
       
        
        
        
        res.send('pollDisplay'+req.body.pollId);
    })

    app.post('/voteRemove',function(req,res){
        console.log('xxxx',req.body);
        res.send('pollDisplay'+req.body.pollData);
    })
}


