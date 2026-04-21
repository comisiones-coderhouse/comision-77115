import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
//var passport = require('passport');
//var LocalStrategy = require('passport-local');
import passport from "passport"
import LocalStrategy from "passport-local"

import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import userModel from "./models/user.model.js"
import AuthError from "./errors/AuthError.js"
import session from "express-session"


//Init
const app = express()


const localStrategy = new LocalStrategy(async (username, password, cb) => {
    console.log("Paso por local strategy")
    console.log("🚀 ~ app.js:18 ~ username:", username)
    console.log("🚀 ~ app.js:18 ~ password:", password)

    try {

        const email = username
        const pass = password

        const isEmailValid = validator.isEmail(email)

        if (!isEmailValid) {
            return cb(null, false, { message: 'Invalid Email' });
        }

        const [findUser] = await userModel.find({ email: email })
        const dbPassword = findUser.password

        await bcrypt.compare(pass, dbPassword)

        //const token = jwt.sign({ email: findUser.email, id: findUser._id }, "secret-key")
        //res.cookie("jwt", token)

        //res.send(token)
        return cb(null, findUser)
    } catch (err) {
        const custom_error = new AuthError(err.message || "No Autorizado")
        //next(custom_error)
        return cb(custom_error)
    }
})



//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "123456",
    saveUninitialized: false,
    resave: false,
    /* store: mongoStore */
}))
passport.use(localStrategy)

//Routes
app.use(userRouter)
app.use(authRouter)


//Error handler
app.use((error, _req, res, _next) => {

    console.log("🚀 ~ app.js:38 ~ error:", error)

    res.status(error.code || 500).send(error.message || "Hubo un error general")
})

export default app