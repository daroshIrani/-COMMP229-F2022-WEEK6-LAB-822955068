import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose' // import library as name passportLocalMongoose - extending mongoose with passport-local

const {PassportLocalSchema} = mongoose; // extracting one preperty form mongoose after installed 'passport-local-mongoose - just another library -- Fix for ES MOdules

const Schema = mongoose.Schema;

const UserSchema = new Schema({  // best practice is not to add password field but do so later on by adding to schema here
    displayName: String,
    username: String,
    emailAddress: String,
}, {
    timestamps:true,
    collection:'users'
});

UserSchema.plugin(passportLocalMongoose); // plugin will take care of userSchema and encrypting passwords

export default mongoose.model('users', UserSchema);

