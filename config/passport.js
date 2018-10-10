const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts ={};
//create an empty object for the jwt options

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport)=>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        // console.log(jwt_payload, 'jwt_payload');

        //now find the user vy their id : remember that jwt_payload populate only they passed authentication in api/users/login
        User.findById(jwt_payload.id).then(user => {
            if(user){
                return done(null, user) //pass in error which is equal to null since user is true, and pass in user from promise
            }
            return done(null, false)//return false which means there was an error somewhere from login, issuing a token, or the user didn't exist in the db
                .catch(err => console.log(err, 'Error from config/passport.js'));
        })
    }));
};