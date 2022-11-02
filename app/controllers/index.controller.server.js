// Author : Darosh Irani
// Student ID : 822955068
// Filename : index.controller.server.js
// Dated : October 2nd, 2022

// Exporting functions that the router will use to render content into the template. Content and the template both are from View folder
// Here we implement a middleware function to handle the responses

// Importing displayName function so it can use the user.displayName from index.utils to authenticate the user (Everywhere there is a header used we authenticate the viewing of the page after user is authenticated - they wouldve been authorized through login )
import { UserDisplayName } from "../Utils/indexUtils.js"; 

export function displayhomePage(req,res,next){
    res.render('index', {title:"Home", page:'home', displayName: UserDisplayName(req) }); /// checking if the object user as a 'req' is there from the function UserDisplayName in Utils/indexUtils.js 
}

export function displayaboutPage(req,res,next){
    res.render('index', {title:"About", page:'about' , displayName: UserDisplayName(req)});
}

export function displayprojectsPage(req,res,next){
    res.render('index', {title:"Projects", page:'projects' , displayName: UserDisplayName(req)});
}

export function displayservicesPage(req,res,next){
    res.render('index', {title:"Services", page:'services' , displayName: UserDisplayName(req)});
}

// rendereing the second template other than index - contact me template stored under views
export function displaycontactPage(req,res,next){
    res.render('contactme', {title:"Contact Me", page:'contact' , displayName: UserDisplayName(req)});
}

export function displayresumeMe(req,res,next){
    res.render('contactme', {title:"Darosh Irani Resume", page : "resumeMe" , displayName: UserDisplayName(req)})
}

export function displaycontactInfo(req,res,next){
    res.render('contactme', {title:"Contact Form info", page : "contactCollection" , displayName: UserDisplayName(req)})
}

