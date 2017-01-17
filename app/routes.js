module.exports= function(app){
    app.get('/',function(req,res){
        res.render('home');
    })

    app.get('/newpoll',function(req,res){
        res.render('newpoll');
    })

    app.post('/newpoll',function(req,res){
        
        console.log('---------',req.body);
        res.render('newpoll');
    })

    app.get('/mypoll',function(req,res){
        res.render('mypoll');
    })
}