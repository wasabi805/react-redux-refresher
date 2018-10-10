const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//Bring in the user model
const User = require('../../models/User.js');

router.get('/test' , (req,res)=> res.json({msg: 'users route works'}));

// REGISTRATION
router.post('/register', (req , res)=>{
    User.findOne({ email: req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({email: 'Email already exists!'})
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

    User.findOne({email: email}).then(user =>{
        //value is the email const defined in this route
        if(!user){
            return res.status(404).json({email: 'User not found.'})
        }
        if(user){
            //password is also the const defined in this route and user.password is the hashed pw in db.
            bcrypt.compare(password, user.password).then(isMatch =>{
                if(isMatch){
                    //if there's a match, generate the token to send back.
                    res.json({msg: 'success'})
                }else{
                    return res.status(404).json({password: "Password is incorrect"})
                }
            })
        }
    })
});

module.exports = router;