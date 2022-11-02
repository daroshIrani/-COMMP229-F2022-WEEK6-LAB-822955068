import passport from "passport";
import userModel from '../../models/user.js';
import { GenerateToken } from "../../Utils/indexUtils.js";

export function processLogin(req,res, next){
    passport.authenticate('local', (err,user,info) =>{
        // are there any server errors?
        if(err){
            console.error(err);
            res.end(err);
        }

        // are there any login errors
        if(!user){
            return res.json({success: false, msg:'error authentication failed'})
        }

        // noporblems we have a good username and password
        req.login(user, (err) =>{
            // are there any db errors
            if (err){
                console.error(err);
                res.end(err)
            }
            
            const authToken = GenerateToken(user);

            return res.json({
                success: true,
                msg: 'User Loggen In Successfully',
                user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    emailAddress: user.emailAddress
                },
                token: authToken

            })
        })
    })(req, res, next);
}

export function processRegistration(req, res, next){
    // Instantiate a new user Object

    let newUser = new userModel({
        ...req.body     // only calls the information as is in the userModel Schema - destructs the userModel object  
    });

    userModel.register(newUser, req.body.password, (err)=>{
        // error validation
        if (err){
            if(err.name === "UserExistsError"){
                console.error("Error user already exists")
            }

            console.log (err);

            return res.json({success: false, msg: "Error registration failed"})
        }

        // all ok user has been registered

        return res.json({success: true, msg: "User Registration Successful"})
    })
}

export function processLogout(re, res, next){
    req.logOut((err)=>{
        if (err){
            consnole.error(err);
            res.end (err);
        }

        console.log('User Logged Out');
    });

    res.json({success: true, msg: 'User Logged out successfully'});
}