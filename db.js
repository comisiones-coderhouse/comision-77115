import mongoose from "mongoose"

function connectDB(callback) {
    mongoose.connect("mongodb://127.0.0.1:27017/demo-backend")
        .then(() => {

            console.log(`Conectado a DB!`)

            callback()

        })
        .catch(() => {
            console.log("Hubo un error con la DB")
        })
}

export default connectDB