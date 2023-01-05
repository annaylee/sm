const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

// Load user model; the path is going outside of the routers folder and then get the model
const User = require('../models/User');

// Show Welcome Page
router.get('/', (req, res)=>{
    res.render('welcome');
});

// Show Dashboard Page ( protected by ensureAuthenticated middleware )
router.get('/dashboard', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', {});
});

// Show Contact Page 
router.get('/contact', ensureAuthenticated, (req, res)=>{
    res.render('contact');
});

// Show Register Page
router.get('/register', (req, res)=>{
    res.render('register');
});

// Show Login Page
router.get('/login', (req, res)=>{
    res.render('login');
});

// Contact Handler ( when submit button is clicked )
router.post('/contact', (req, res)=>{

    const { name, email, comments} = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !comments){
        errors.push({msg: 'Please fill in all fields'});
    }

    // Check to see if there are errors
    if (errors.length > 0){
        // Show contact page with errors and original data entered by user
        res.render('contact',{ errors, name, email, comments }); // ES6 Syntax
    } else { 
        req.flash('success', 'Thank you for contacting us.')
        res.redirect('/contact');
    }
});

// Register Handler ( when register button is clicked )
router.post('/register', (req, res)=>{

    const { name, email, password, password2 } = req.body; // javascript destructor
    let errors = [];

    // BASIC VALIDATIONS ( required fields, passwords match, password length )

    // Check required fields ( all fields are required )
      if (!name || !email || !password || !password2){
          errors.push({msg: 'Please fill in all fields'});
    }

    // Check passwords match
    if (password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    // Check password length
    if (password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    // Check to see if there are errors
    if (errors.length > 0){
        // Show register page with errors and original data entered by user
        res.render('register',{ errors, name, email, password, password2 }); // ES6 Syntax
    } else {

        // At this point, basic validations passed
        // So check to see if email already exists 
        User.findOne({ email: email })
        .then((user)=>{
            
            if (user){ // user exists

                errors.push({ msg: 'Email is already registered' });
                res.render('register',{ errors, name, email, password, password2 }); // ES6 Syntax

            } else { // user does not exist and ok to register

                const newUser = new User({
                    user: user,
                    email: email,
                    password: password});

                    // console.log(newUser); // this will show password in plain text

                    // Hash password
                    // Generate a salt so that we can create a hash
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{

                            if (err) throw err;
                            newUser.password = hash; // set password to hashed
                            newUser.save()  // save user
                            .then((user)=>{

                                // Show a connect-flash message after redirect
                                // Must call req.flash() before redirect
                                req.flash('success', 'You are now registered and can log in');
                                res.redirect('/login');
                            })
                            .catch((err)=> {
                                console.log(err);
                            });

                        }); // end of hash 
                    }); // end of genSalt 
                 
            } // end of else

        }); // end of then
    }
});

// Login Handler ( when login button is clicked )
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handler( when logout button is clicked )
// req.logout() is now an asynchronous function 
router.get('/logout', (req, res, next)=>{

    req.logout(function(err) {  // use passport method .logout()
        if (err) { return next(err); }
        req.flash('success', 'You have been successfully logged out');
        res.redirect('/login');
      });
});

module.exports = router;