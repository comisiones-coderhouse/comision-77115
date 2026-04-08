import mongoose from "mongoose"
import validator from "validator"

//MongoDB Models + Schemas
//El schema seria el "validador" de los datos
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email)
            },
            message: "No valido el email"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                return validator.isStrongPassword(password)
            },
            message: "No valido el password"
        }
    },
}, {
    timestamps: true
})
//El modelo seria el punto de entrada a las consultas a la DB
const userModel = mongoose.model("User", userSchema)

export default userModel