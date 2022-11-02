// Code added in Week 4

import {Router} from "express"; // Import the router modeule from express middleware

import { DisplayMoviesList, 
    DisplayMoviesAddPage, 
    ProcessMoviesAddPage, 
    DisplayMoviesEditPage, 
    ProcessMoviesEditPage, 
    ProcessMoviesDelete} from "../controllers/movies.controller.server.js"; // importing the movie list function from respective file

// Week 5 AUthguard added
import { AuthGuard } from "../Utils/indexUtils.js";    

const router = Router();

router.get('/movie-list', DisplayMoviesList); 
router.get('/movie-add', AuthGuard, DisplayMoviesAddPage);      // call authguard or call next which is DisplayMoviesAddPage (Authguard is defined in utils)

router.post('/movie-add', AuthGuard, ProcessMoviesAddPage);
router.post('/movie-edit/:id', AuthGuard, ProcessMoviesEditPage);
router.get('/movie-edit/:id', AuthGuard, DisplayMoviesEditPage); /// Remember, when you lok at the routes, 'get' means when this url '/movie-edit/:id ( id which is provided from the DisplayMoviesEditPage on movies.controller.. ) is called, specific function is run 
                                                                    // id in this case is provided by what is collected by the controller 
router.get('/movie-delete/:id', AuthGuard, ProcessMoviesDelete)

export default router; 

// Remember - when you export a variable using default, 
// you do not need curly brackets when importing them in anoher file
// Otherwise you always need {} - system modules like router are put in {} because
// no physical file actually exports them to be imported as of now in class studies 