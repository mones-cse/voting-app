require('./models/user');
var Poll =require('./models/poll');

module.exports= function(app,passport){
   
    app.get('/', function (req, res) {
        Poll.find({}, function (err, polls) {
            if (err) {
                throw err;
            }
            res.render('home', { polls: polls });
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
                res.send('invalid input');
            }else{
                if(poll){
                    res.render('pollDisplay',{poll:poll});
                }else{
                   
                }
                 
            }
        })
    })

    app.post('/voteAdd', function (req, res) {
        Poll.findById(req.body.pollId, function (err, poll) {
            if (err) {
                throw err
            }
            if (poll) {
                var index = poll.options.findIndex(function (eachOption) {      //find for existed option                 
                    return eachOption.name === req.body.pollSelectedValue;
                })                
                if (index > -1) {                                               //if match update count                                  
                   poll.options[index].voteCount++;
                } else {                                                        //else insert new data                     
                    poll.options.push({ name: req.body.pollSelectedValue, voteCount: 0 })
                }
                poll.save(function(err,updatedPoll){
                    if(err){
                        throw err;
                    }
                    console.log(updatedPoll);
                    res.render('pollDisplay',{poll:updatedPoll});                    
                })
                //save 
                //reload 
            }
        })
    })

    app.post('/removePoll',function(req,res){
        Poll.findByIdAndRemove(req.body.pollId,function(err){
            if(err){
                throw err;
            }
             res.redirect('/');
        })       
    })

     app.get('/profile', isLoggedin, function (req, res) {
        res.render('profile', { user: req.user });
    })

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    })

    app.get('/auth/facebook', passport.authenticate('facebook',{scope : ['email']}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


}


function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}