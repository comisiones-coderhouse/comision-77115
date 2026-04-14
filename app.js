import express from "express"
import cookieParser from "cookie-parser"
/* import session from "express-session"
import MongoStore from "connect-mongo" */

import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"

/* import jwt from "jsonwebtoken" */

//const mi_token = jwt.sign({ email: "test@test.com" }, "secret-key")
/* function validar() {
    try {
        const valida = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3NzYyMDUzMDd8.Yf2VZNswPWWlfLQ5PPvX57lolkY0z4fxvBsy3z5VBdg", "secret-key")
        console.log("🚀 ~ app.js:13 ~ mi_token:", valida)
    } catch (err) {
        console.log("Soy un lindo error")
    }
}

validar() */

//Inincializacion
const app = express()
/* const mongoStore = MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017",
    dbName: "demo-backend",
}) */

//JWT : Json Web Token

//Middlewares
app.use(express.json())
app.use(cookieParser())
/* app.use(session({
    secret: "123456",
    saveUninitialized: false,
    resave: false,
    store: mongoStore
})) */


app.use(userRouter)
app.use(authRouter)

app.use((error, req, res, next) => {
    //console.log(error)
    res.status(500).send("Hubo un error general")
})

export default app