const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); // use bcrypt to compare passwords

// Load User model
// The path is to go outside of the 'config' folder to get the model
const User = require('../models/User');

// Not require 'passport' because we will pass in 'passport' from index.js ( i.e. server )
// Register the strategy using passport.use() method that uses an instance of LocalStrategy object.
// The LocalStrategy constructor takes a callback function as an argement.
// The callback function accepts three argements - email, password, and a done callback which will be
// called when the authentication process is over. Inside the callback function, we use the User model
// to find a user with that email and authenticate it. In the event of an error, you will pass the error 
// object to the done callback. When the user is authenticated, we will call the done callback with the
// User object. 

module.exports = function(passport){

    // Register LocalStrategy
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{

        // Match user email ( compare what is entered by user with what is stored in database )
        User.findOne({email: email})
        .then((user)=>{

            // Will get a null or an user
            if (!user){ // email not match
                return done(null, false, { message: 'This email is not registered'})
            }

            // Match password ( compare password entered by user with hashed password stored in database)
            // The first argument 'password' is what user has entered
            // The second argument 'user.password' is coming from database and is hashed
            
            bcrypt.compare(password, user.password, (err, isMatch)=>{  // isMatch is boolean

                if (err) throw err;
                if (isMatch){  // if match, then return null for err and user for user
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect'});
                }
            })
        })
        .catch((err)=>{ 
            console.log(err);
        });

    })); // end of passport.use()

    // Serialize & Deserialize
    // The passport.serializeUser() and passport.descrializeUser() methods are used to define 
    // how passport will handle user serialization. When a user is authenticated, passport will 
    // save its _id property to the session. Later on when the user object is needed, passport will
    // use the _id property to grab the user object from the database.

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err,user)=>{
            done(err, user);
        });
    });
}
