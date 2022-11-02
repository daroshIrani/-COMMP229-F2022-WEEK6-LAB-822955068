// Author : Darosh Irani
// Student ID : 822955068
// Filename : config.js
// Dated : October 2nd, 2022

// session information is to be set here and global variables
export const Secret = "MySecret"

// export const MongoURI = "mongodb://127.0.0.1/media" // const name can be any, and you connect the code from 'mongosh' here as the address of your datatbase during production 
                                            // stage because db is local rightnow  - you do not need the actual prt number because mongo always connects on port 27017 anyway - Remmeber
                                            // to run the 'mongosh' command in a seperate cmd prompt after running 'mongod' and starting the server
                                            // Rememebr - /media is added so that we tell our that we are starting a new database called 'media' at the provided address above
                                            //              and 127.0.0.1 is local host anyway

export const MongoURI = "mongodb+srv://darosh:Wvam6305161!@comp229-week5.hllnhbm.mongodb.net/media1?retryWrites=true&w=majority" // we use media1 same way we used the connectipon to media up above - at this point
                                                                                                                                 // we do not need the local mongod or mongosh connection 
                                                                                                                                 // make sure you add the ip 0.0.0.0/0 to allow anyone to access it with permiosisons
                                                                                                                                 // media1 becomes the new name of the db on atlas