//Imports
import express from 'express'
import cookieParser from 'cookie-parser';
import session from 'express-session';

//Constantes de configuracion
const PORT = 4000;

//El servidor
const app = express();

//Configuraciones del servidor
//Vacio...

//Middlewares
app.use(cookieParser())
app.use(session({
    secret: "123456",
    //saveUninitialized : false,
    //store
}))



//Rutas

//"Bienvenido undefined"

app.get("/", (req, res) => {

    console.log(req.session.nombre)//undefined | "Horacio"

    //console.log("🚀 ~ index.js:22 ~ req.cookies:", req.cookies) //{ nuevaCookie: 'test@mail.com' }

    //TRUE o FALSE|0|undefined|null|""|NaN
    //req.cookies
    //{ nuevaCookie: 'test@mail.com' }
    //{  }

    if (req.cookies.nuevaCookie) {
        res.send(`Bienvenido ${req.cookies.nuevaCookie}!`)
    } else {
        res.send(`Por favor ingrese primero`)
    }


});

app.get("/set-cookie", (req, res) => {

    //Query Params
    //console.log(req.query) // {email :"test@email.com"}

    //res.setHeader("Set-Cookie","nuevaCookie=123456;")
    //res.cookie('nuevaCookie', '123456')
    res.cookie('nuevaCookie', req.query.email)

    res.send("Se envio la cookie")
})

app.get("/session", (req,res) => {
    //Por afectar el objeto session
    req.session.nombre = "Horacio"
    res.send("session creada!")
})

//Puertos + Conexion a DB
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))


/* 

HTTP Protocol

Request (client)
Mehod URL/IP httpVersion
Headers
Body

Response (server)
httpVersion statusCode statusMessage
Headers
Body


https://www.google.com/search?

Query String/ MIME-Type : x-www-application/form

q=rick+y+morty &
sca_esv=95fd351cc3e058c0 & 
sxsrf=ANbL-n4AHPorHcF0HpSkAFY5mJGJhsDyDA%3A1773183155032 & 
source=hp & 
ei=sqCwaYmqPLHY1sQPp9OEmA4 & 
iflsig=AFdpzrgAAAAAabCuw3UcDI04k7GSJrcpTYy_AAbKHkTW&ved=0ahUKEwiJy8yAtpaTAxUxrJUCHacpAeMQ4dUDCCE & 
uact=5 & 
oq=rick+y+morty & 
gs_lp=Egdnd3Mtd2l6IgxyaWNrIHkgbW9ydHkyChAjGIAEGCcYigUyCBAuGIAEGMsBMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMggQABiABBjLATIIEAAYgAQYywFIhAtQAFjoCXAAeACQAQCYAaMBoAHyCqoBBDIuMTC4AQPIAQD4AQGYAgygApcLwgILEAAYgAQYkQIYigXCAggQABiABBixA8ICDhAuGIAEGLEDGIMBGIoFwgILEAAYgAQYsQMYgwHCAggQLhiABBixA8ICDhAAGIAEGLEDGIoFGI0GwgIEECMYJ8ICCxAuGIAEGLEDGIMBwgIOEAAYgAQYsQMYgwEYigXCAgUQABiABMICBRAuGIAEwgIIEC4YgAQY5QSYAwCSBwQyLjEwoAfulwGyBwQyLjEwuAeXC8IHBTAuOC40yAcggAgA & 
sclient=gws-wiz

*/