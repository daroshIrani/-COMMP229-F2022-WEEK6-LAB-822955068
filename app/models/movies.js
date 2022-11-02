// All code added here in Week 4 - creating of db

// We can connect to a mongo db without Mongoose but as an 'Object Relationship modeller' (mongoose) it simplifies access to our datatabse by containing
// code that lets you Create Replace Update Delete command the db - you can create custom schemas so you can define the datat storage model in the mongo db 

import mongoose from "mongoose"; // Step 1 to setup a database model

const Schema = mongoose.Schema; // Instanstiate schema class

const MovieSchema = new Schema({ // start creating schema class (look at the line carefully - it looks like a method ({}) with a JSON object being created )
    name : String,                  // type of object in mongoose - not same as string variable
    year: String,
    director: String,
    genre: String,
    runtime: Number
}, {                                // Put options here
    timestamps: true,               // If we were directly w/o mongoose we would have to write code to record all timestamps when working directly with mongodb
    collection: 'movies'
});

export default mongoose.model('Movies',MovieSchema); // exporting the schema as set above as 'Movies' - same as 'export default indexRouter' -- The 'default' allows any name to be used 
                                                     // in the import statement that imports this file within the movies.controller.server.js file