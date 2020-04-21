
const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User Model 
const User = require('../DB/User');


route.get('/login',(req,res ) => res.render('login'));

route.get('/register',(req,res ) => res.render('register')) 


route.post('/register' , (req,res)=>{
    console.log(req.body)

    const{name ,email , password , password2} = req.body;
    let user = {};
    let errors = [];

    //Check validation to fields
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please Fill in all fields ' })
    }

    //Check if Passeors match
    if(password !== password2){
        errors.push({msg:'Passwords Dont Match ! please change it  ' })
    }
    //Check Pass length
    if(password < 6){
        errors.push({msg:'Password legneth is less thn 6 numbers ...  ' })
    }
    if(errors.length > 0) {
        console.log(errors)
        res.render('register' , {errors,name,email,password,password2})
    }else{ 
        //Validation Pass 
        User.findOne({email:email}).then(user => {if(user){
            errors.push({msg :'Email is Allready exists ! '});
            res.render('register', {errors,name,email,password,password2});
        }else{
            const newUser = new User({
                name,
                email,
                password
            });
            bcrypt.genSalt(10,(err,salt) => 
                 bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err;
                    //set Password to Hash 
                    newUser.password = hash;
                    newUser.save().then( user =>{
                    res.redirect('/users/login');
                    }).catch(err => console.log(err));
            }))
        }
    });
    }
});

route.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
    })(req, res, next);
});
  

module.exports = route;