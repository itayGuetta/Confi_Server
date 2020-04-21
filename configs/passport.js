const LocalStrategy = require('passport-local');
const mongose = require('mongoose');
const bycrypt = require('bcryptjs');

const User = require('../DB/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({userNameField : 'email' },(email, password , done) => {
            User.findOne({email : email})
            .then(user => {
                if(!user)
                {
                    return done(null,false,{massage : 'The email is not recognize ! '});
                }
                //Succses 
                bycrypt.compare(password, user.password,(err,suc) => {
                    if(err) throw err ;
                    if(suc){
                        return done(null,user)
                    }else
                    {
                        return done(null,false,{massage : 'The Password Dont Match  ! '});
                    }
                });

            })
            .catch(err => console.log(err));

        })
    );
    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
            done(err, user);
        });
    });


}