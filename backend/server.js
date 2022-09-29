import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

import express from "express"
import UserRouter from "./routes/userRouter.js";
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcryptjs"
import passport from "passport";
import initializePassport from "./passport-config.js";
import session from "express-session"
import flash from "express-flash"

const PORT = 3000;
const users = []  // for test before connecting to mongoose
const MESSAGE_CODES = {
    OK: "ok",
    ERROR: "error",
}

// ----------------------- PASSPORT MNGT ---------------------------

initializePassport(
    passport,
    email => users.find(x => x.email === email),
    id => users.find(x=>x.id === id)
)

// ----------------------- EXPRESS INSTANTIATION -------------------
const app = express();

// ----------------------- MIDDLEWARES -----------------------------

// CORS control middleware
const corsOptions = {
    origin: "http://localhost:5173"
}
app.use(cors(corsOptions))
// managing format of exchanged data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// flash to manage exchanged messages
app.use(flash())
// session to manage sessions
app.use(session({
    secret: process.env.SESSION_SECRET,// a key we keep secret and that we ll use to encrypt all our information
    resave: false, // basic setting to indicate we dont want to resave session if nothing is changed
    saveUninitialized: false // basic setting to indicate we dont want to save an empty session value if there s no value
}))
app.use(passport.initialize())
app.use(passport.session()) // will work together with the express-session middleware defined above, to store data within session

// ----------------------- ROUTES MNGT -----------------------------

app.post("/register", async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        console.log(`hash: ${hashedPass}`)
        if (users.some(x => (x.email === req.body.email)))
            return res.json({ message: MESSAGE_CODES.ERROR })
        const user = {
            id: Date.UTC.now.toString(),
            email: req.body.email,
            password: hashedPass,
            name: req.body.name
        }
        users.push({ user })
        return res.json({ message: MESSAGE_CODES.OK })
    }
    catch (error) {
        console.log(error)
        res.status(500).json("SERVER ERROR")
    }
})

app.post("/login", passport.authenticate("local", {
    successMessage: MESSAGE_CODES.OK,
    failureMessage: MESSAGE_CODES.ERROR,
    failureFlash:true,

})
)

app.get("/logout", (req, res) => {
    // TODO disconnect with passport, 
    return res.json({ message: MESSAGE_CODES.OK })
})


app.use("/users", UserRouter)


// ----------------------- FINALIZING EXPRESS SETTING -----------------------------

app.listen(PORT)
console.log(`SERVER STARTED ON PORT ${PORT}`)