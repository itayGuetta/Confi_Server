const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User.js');
const route = express.Router();



route.post('/register' , async(req,res)=>{
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
    if(password.length < 6){
        errors.push({msg:'Password legneth is less thn 6 numbers ...  ' })
    }

    if(errors.length > 0) {
        res.render('register' , {errors,name,email,password,password2})
    }else{ 
    user.Name = name;
    user.email = email;
    user.password = password;
    user.date = date;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
    }
});



module.exports = route;