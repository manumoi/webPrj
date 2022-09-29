import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs"

const initialize = (passport, getUserByEmail, getUserById)=>{

    // function to pass as parameter of our localStrategy instance (see below), that will proceed with authentication
    // requires email and password in localStrategy context, as well as a done function that is called once we re done authenticating a user
    // done has a server error as first parameter, and the user we found as second parameter, third will be a message to be dsiplayed
    const authenticateUser = async (email, password, done)=>{
        const user = getUserByEmail(email) // to get a user from DB, that has the correct email (it s expected to be unique); return null if nothing
        if (user == null){ // no user is found
            return done (null, false, {message: "No user with that email"}) // no server error, and no user
        }
        try{
            if (await bcrypt.compare(password,user.password)){   
                return done(null, user)     // password is correct, return the user
            }
            else{
                return done (null, false, {message: "Password is incorrect"})
            }
        }
        catch(error){
            return done(error, false, {message: "server error"})
        }

    }

    // a middleware where we define the strategy to be used by passport
    passport.use(new LocalStrategy({ usernameField: "email"}, authenticateUser)) // passing of login/password might not work currently

    // a function to serialize our user so it can be stored inside a session
    passport.serializeUser((user, done)=> done(null, user.id))

    // a function to recreate a user from data stored in a session, based on an id
    passport.deserializeUser((id, done)=> done(null, getUserById(id)))

}

export default initialize;