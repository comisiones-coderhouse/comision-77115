import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"

//init
const PORT = 3000
const app = express()
const mongoStore = MongoStore.create({
    //mongoUrl : "mongodb://localhost:27017",
    mongoUrl: "mongodb://127.0.0.1:27017",
    dbName: "demo-backend"
})

//MongoDB Models + Schemas
//El schema seria el "validador" de los datos
const userSchema = new mongoose.Schema()
//El modelo seria el punto de entrada a las consultas a la DB
const userModel = mongoose.model("User", userSchema)

//middleware : son funciones con la firma 
//function middleware(req,res,next){}
//app.use(middleware)

//req.body
app.use(express.json())

//req.cookies
app.use(cookieParser())

//req.session
app.use(session({
    secret: "123456",
    saveUninitialized: false,
    resave: false,
    store: mongoStore
}))


//routes
app.get("/", (req, res) => {
    console.log("🚀 ~ index.js:11 ~ req:", req.cookies)
    console.log(req.session)
    if (req.session.usuario) {
        res.send("Bienvenido " + req.session.usuario)
    } else {
        res.send("Logueate!")
    }
})

app.get("/login", (req, res) => {
    req.session.usuario = "horacio"
    res.send("Login exitoso!")
})

app.post("/signup", (req, res) => {
    console.log(req.body)
    res.send("Usuario creado!")
})


//start
console.log(`Conectando a DB....`)
mongoose.connect("mongodb://127.0.0.1:27017/demo-backend")
    .then(() => {

        console.log(`Conectado a DB!`)

        app.listen(PORT, () => {
            console.log(`Servidor Web corriendo en puero ${PORT}!`)
        })

    })
    .catch(() => {
        console.log("Hubo un error con la DB")
    })