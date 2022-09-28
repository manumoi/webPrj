import express from "express"

const userRouter = express.Router("/");

// get the list of users
userRouter.get("/", (req, res, next)=>{
    console.log("get user list")
    res.json({message:"user list sent"})
    next();
})

userRouter.post("/", (req, res, next)=>{
    console.log("create a new user")
    res.json({message:"user created"})
})

// get userdata whose specific id is :id
userRouter.get("/:id", (req, res, next)=>{
    console.log("get userData");
    res.json({message:"user data sent"})
    next();
})

// update userData of the used whose id is :id
userRouter.put("/:id", (req, res, next)=>{
    console.log("update userData");
    res.json({message:"user data updated"})
    next();

})

// delete a user whose id is :id
userRouter.delete("/:id", (req, res, next)=>{
    console.log("delete user")
    res.json({message:"user deleted"})
    next();

})

export default userRouter