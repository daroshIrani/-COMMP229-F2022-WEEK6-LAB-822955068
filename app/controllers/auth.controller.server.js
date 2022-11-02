import  express  from "express";

// need passprt as well
import passport from 'passport';

// need to include the User Model for authentication
import User from '../models/user.js';

// import DisplayName Utility Method
import { UserDisplayName } from "../Utils/indexUtils.js"

//Display functions
export function DisplayLoginPage(req,res,next){
    if (!req.user){                                                                                                     // Since we imported UserDisplayName from indexUtils, we check if the user exists 
        return res.render ('index', {title:'Login' , page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)})   //  If user does not exist we render the index  template and login page with a variable messages which flashes loginMessage 
    }                                                                                                                    // Variables like displaName can be added so that the page gets and uses them

    return res.redirect('/movie-list');
}

export function DisplayRegisterpage(req,res,next){
    if (!req.user){                                                                                                 // Since we imported UserDisplayName from indexUtils, we check if the user exists 
        return res.render ('index', {title:'Register' , page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)})     //  If user does not exist we render the index  template and registerpage with a variable messages which flashes loginMessage 
    }

    return res.redirect('/movie-list');
}

// Processing Functions
export function ProcessLoginPage(req,res,next){         
    passport.authenticate('local', function (err, user, info) {                // Verifying password information using 'local' strategy as defined in the index.js file - not 'google', 'facebook' etc - default signature - after local --> function (err,user,info){we are not using it here right now}
        if (err) {                                                              // three parameters of the authenticate callback function are err, user (as verified from userSchema in user.js collection), and info
            console.error(err);                                                 // If error console displays error and ends repsonse
            res.end(err);
        }

        if (!user){                                                            // if user does not exist
            req.flash ('loginMessage', 'Authentication Error');                 // request flashes login message which asys 'Authentication Error'
            return res.redirect('/login');                                      // redirect to login page again
        }

        req.logIn(user, function (err){                                          // this method for logIn only exists inside passport.authenticate () and takes two arguments user (from above) and error
            if (err){                                                              // if any errors still arise with user info, err called below and if not, redirect to home page
                console.error(err);
                res.end(err);
            }

            return res.redirect('/');
        })


    })(req,res,next);
}

export function ProcessRegisterPage(req, res, next){
    let newUser = new User({                                        // Create new User with three fields in userSchema
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, function(err){        // Method 'register' exists because we have used passport-local-mongoose - it uses its own functionality to process passwpord
        if(err){                                                    // if ther eis an error, we check other error types
            if(err.name == "UserExistsError"){                      // if user exits
                console.error('ERROR: User Already Exists!');       // documentation for passport=local-mogose said to use these messages - console logged eroro message first and then
                req.flash('registerMessage', 'Registration Error')  // flash the eroor
            } else {
                console.error(err.name);                            // if it is isnt the error above, log the error.name 
                req.flash('registerMessage', 'Server Error')        // flash server error
            }
            
            return res.redirect('/register');                       // if no errors from above ,return to register because something else went wrong
        }

        return passport.authenticate('local')(req, res, function(){  // same method as ProcessLoginPage - run local sttrategy and run function to redirect page
            return res.redirect('/');
        });
    });
}

export function ProcessLogoutPage(req, res, next){                  // 
    req.logOut(function(err){                                       // request. logout 
        if(err){                                                    // if error, 
            console.error(err);                                     // log error
            res.end(err);
        }

        console.log("user logged out successfully");                // console mssage to cofirm logout
    });

    res.redirect('/login');
}