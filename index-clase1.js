//Stateless : No mantienen estado, cada petición es independiente de las demás. No guardan información entre peticiones. Ejemplo: Servidores web tradicionales, APIs RESTful.

//Web Storage : LocalStorage y SessionStorage
//Cookies : 


//Cliente(navegador) ----- un request ---> Servidor (Express)
//Servidor (Express) --- una respuesta + cookie ---> Cliente(navegador)
//Cliente(navegador) guarda la cookie en el disco
//Cliente(navegador) ----- un request + cookie ---> Servidor (Express)


//const express = require("express");
import express from "express"
import cookieParser from "cookie-parser";

const PORT = 3000;

//Instancia del servidor
const app = express();

//Middleware
//elServidor.use(unMiddlware)
//app.use(express.json())
app.use(cookieParser()) //Middleware para parsear las cookies de las peticiones entrantes. Sin esta linea, no puedo nunca ver req.cookies, osea siempre va a ser undefined.

//rutas
app.get("/prueba", (req, res) => {

    //console.log(req.body)
    console.log(req.cookies) //Accedemos a las cookies enviadas por el cliente

    //NodeJS Nativo
    //res.write()
    //res.end()

    //Express
    //res.send()
    res.json(["HOla mi gente"])

})

app.get("/setcookie", (req, res) => {

    //Seteo la cookie antes de enviar la respuesta
    res.cookie("miCookie", "Valor de mi cookie")

    //envio la respuesta final
    res.send("Cookie seteada")
})


//Levantar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
