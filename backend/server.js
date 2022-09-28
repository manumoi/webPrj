import express, { urlencoded } from "express"
import UserRouter from "./routes/userRouter.js";
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcryptjs"


const PORT = 3000;
const app = express();

const users = []  // for test before connecting to mongoose
// CORS control middleware
const corsOptions = {
    origin: "http://localhost:5173"
}

const MESSAGE_CODES={
    OK:"ok", 
    ERROR: "error",
  }


app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES management
app.post("/login", async (req, res) => {
    try {
        const tmp = users.find(x => x.email === req.body.email)
        if (!tmp)
            return res.json({ message: MESSAGE_CODES.ERROR })
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        console.log(`hash: ${hashedPass}`)
        if (tmp.password !== hashedPass)
            return res.json({message: MESSAGE_CODES.ERROR})
        return res.json({message: MESSAGE_CODES.OK})
    } catch (error) {
        console.log(error)
        res.status(500).json("SERVER ERROR")
    }

})

app.post("/register", async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        console.log(`hash: ${hashedPass}`)
        if (users.some(x => (x.email === req.body.email)))
            return res.json({ message: MESSAGE_CODES.ERROR })
        const user = {
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

app.use("/users", UserRouter)




app.listen(PORT)
console.log(`SERVER STARTED ON PORT ${PORT}`)