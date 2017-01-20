require('dotenv').config();

module.exports ={
    'facebookAuth':{
        'clientID': process.env.FB_CLIENT_ID,
        'clientSecret': process.env.FB_CLIENT_SECRET,
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    }
}