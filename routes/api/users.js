const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../.././validation/register');
const validateLoginInput = require('../.././validation/login');
//Bring in the user model
const User = require('../../models/User.js');

router.get('/test' , (req,res)=> res.json({msg: 'users route works'}));

// REGISTRATION
router.post('/register', (req , res)=>{
    //destruct from /validation/register.js : if there a an error in thr form submit, isValid will === false.
    const {errors, isValid} = validateRegisterInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email})
        .then(user =>{
            if(user){
                errors.email = 'Email already exists!';
                return res.status(400).json({email: errors})
        }
        else{
            // make a new instance inside UserSchema && fill it with the values from the form
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            //then, encrypt the password: 1st arg is salt rounds, 2nd arg is callback
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, (err, salt)=>{
            //      either: err = salt did not generated  || salt = salt was created.
            //      if salt was created... we need to hash it:
                //  hash takes: 1stArg = the password, 2ndArg= the salt, 3rdArg=  a callback with either an error or
                //  the successfully hashed password as args
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    //for the callback passed into .hash() , if we get an error ...
                    if(err) throw err; res.json({msg: 'Errors on the form'});

                    if(hash){
                    //    if hash is sucessfull, insert set the arg1 = newUser.password to the hash/arg2= hash so we can store hashed pw in db.
                        newUser.password = hash;
                        //finally, save the hashed pw into the db: give it a promise so we can SEND BACK a succes msg to the new registered user
                       newUser.save().then(user => res.json({user ,  msg: 'You are now registered!'}).catch(console.log(err)))
                    }
                })
            });
        }
    })
});

// LOGIN / RETURNS THE TOKEN
router.post('/login', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    //  VALIDATION
    const {errors, isValid} = validateLoginInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }
    User.findOne({email: email}).then(user =>{
        //value is the email const defined in this route
        if(!user){
            errors.email = 'User not found.';
            return res.status(404).json({email: email})
        }
        if(user){
            //password is also the const defined in this route and user.password is the hashed pw in db.
            bcrypt.compare(password, user.password).then(isMatch =>{
                if(isMatch){
                    //if there's a match, generate the token to send back: SIGN IN THE USER
                    //.sign() takes in a payload, payload is what we want to include in the token : in the payload, will be some of the user's info and a secret/key
                    const payload = {
                        //don't include private stuff
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                    jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600},
                        //pass in the payload to generate a token, the key, when the key expires, and a callback that returns an error or the token upon successful login.
                        //if successful, the token gets sent back as the response
                        (err, token)=>{res.json({success: true, token: 'Bearer ' + token})} //weill need enter the token into the header
                        );
                }else{
                    errors.password = "Password is incorrect";
                    return res.status(404).json({password: password})
                }
            })
        }
    })
});

//Current user after they pass login and receive the token (PRIVATE ROUTE)
router.get('/current', passport.authenticate('jwt', {session: false}),
    (req,res)=> {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    });
    //arg1: route handle
    //arg2 : pass in passport.authenticate() <== this method takes the token, session param
    //arg3: cb
module.exports = router;