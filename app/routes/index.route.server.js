// Author : Darosh Irani
// Student ID : 822955068
// Filename : index.route.server.js
// Dated : October 2nd, 2022

// Importing Router Object from express module
import {Router} from "express";
// Importing the functions from controller to run here
import { displayaboutPage, displayhomePage, displayservicesPage, displaycontactPage, displayprojectsPage, displayresumeMe, displaycontactInfo } from "../controllers/index.controller.server.js";

// Instantiating the router onject as a variable to use
const indexRouter = Router();


// setting the functions to run from the controllers as the router is directed to specific URL's
indexRouter.get('/', displayhomePage);
indexRouter.get('/home', displayhomePage);
indexRouter.get('/services', displayservicesPage);
indexRouter.get('/about', displayaboutPage);
indexRouter.get('/contact', displaycontactPage);
indexRouter.get('/projects', displayprojectsPage);
indexRouter.get('/resumeMe', displayresumeMe);
indexRouter.get('/contactCollection', displaycontactInfo);



// exporting the router to be used in index.js
export default indexRouter;
