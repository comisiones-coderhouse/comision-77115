import connectDB from "./db.js"
import app from "./app.js"

const PORT = 3000

console.log(`Conectando a DB....`)
connectDB(() => {
    app.listen(PORT, () => {
        console.log(`Servidor Web corriendo en puero ${PORT}!`)
    })
})