// Week 4 code added here

import movieModel from '../models/movies.js'; // because the export is 'default' under the movies.js under models folder, we can name any name for the import statement - in this case
                                              // it is called movieModel

// Week 5 AUthenticating user
// Importing displayName function so it can use the user.displayName from index.utils to authenticate the user (Everywhere there is a header used we authenticate the viewing of the page after user is authenticated - they wouldve been authorized through login )
import { UserDisplayName } from '../Utils/indexUtils.js';

export function DisplayMoviesList(req,res,next){                                                 // We check if we have a list of things or an error - the function .find asks if 
movieModel.find(function(err, moviesCollection){                                            // the function has an error what to do and if it is successfull what to do
    if (err){                                                                               // we define what to do if there is an error - we do  error checking  
                                                                                            // because we are now making a db connection with a controller
        console.error(err);
        res.end(err)
    }
    res.render('index', {title:'Movie List', page:'movies/list', movies:moviesCollection , displayName: UserDisplayName(req)} ); // if there is no error render the index page using the same header and footer as index,
                                                                                            // but, page we render is under content/movies/list - title is given as will be filled in
                                                                                            // the index.ejs page and the page it will be directed to is movies/list (follows 
                                                                                            // same pattern as index.controller.server.js) - only difference is that one more variable
                                                                                            // will be rendered which is the movies variable : as the movies collection list - this is 
                                                                                            // used in the /content/movies/list page to generate the rows <% - .....%>
    })
}

export function DisplayMoviesAddPage (req,res, next){
    res.render('index', {title: 'Add Movie', page : 'movies/edit', movie:{} , displayName: UserDisplayName(req) });
}



export function ProcessMoviesAddPage(req,res, next){    // function to add a  new movie object to database from form that will POST the information from edit.ejs
    let newMovie = movieModel({
        name: req.body.name,            // adding the new movie object to the databse will be done by accessing
                                        // request which accesses the body (from edit.ejs, form is submitted with post and enotre body of form is submitted)
                                        // name is the 'name' attributes value within the edit page for the input 'name' - simmilar process is followed to fill up the movieModel object
    
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime

     });
     
     movieModel.create(newMovie,(err, Movie) =>{   //  movieModel.create(newMovie, (err, Movie) -- oriinal function ProcessMoviesAddPage will be processing info on add page as the above codei srun to create the object, function movieModel.create is used to check for error and if not, create the model to be exported to db and redirect the page
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/movie-list')

     })

}


export function DisplayMoviesEditPage (req,res, next){
    let id = req.params.id;                             // retreival of request and parameters on every request
    movieModel.findById(id, (err,movie) =>{             // This is how you do error checking, 
        if(err){                                        // if error,
        res.end(err)                                    // response ends with err
        };
        
        res.render('index', {title: 'Edit Movie', page : 'movies/edit', movie:movie , displayName: UserDisplayName(req)});
    })

}

export function ProcessMoviesEditPage(req, res, next){

     let id = req.params.id;
    
    let newMovie = movieModel({
        _id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime
    });

    movieModel.updateOne({_id: id }, newMovie, (err, Movie) => {
        if(err){
            console.error(err);
            res.end(err);
        };

        res.redirect('/movie-list')
    } )
}

export function ProcessMoviesDelete(req,res, next){
    let id = req.params.id;

    movieModel.remove({_id:id}, (err)=> {
        if (err){
            console.error(err);
            res.end(err)
        }

        res.redirect('/movie-list');
    })
}


// If you need to manipulate the movie list before page is rendered - this is where you do it - The controller renders the page, and the ocnnection here as well