import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"

import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"

//Inincializacion
const app = express()
const mongoStore = MongoStore.create({
    //mongoUrl : "mongodb://localhost:27017",
    mongoUrl: "mongodb://127.0.0.1:27017",
    dbName: "demo-backend"
})

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "123456",
    saveUninitialized: false,
    resave: false,
    store: mongoStore
}))


app.use(userRouter)
app.use(authRouter)

export default app