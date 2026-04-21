import validator from "validator"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import AuthError from "../errors/AuthError.js"

const loginController = async (req, res,next) => {

    try {

        const email = req.body.email
        const password = req.body.password

        const isEmailValid = validator.isEmail(email)

        if (!isEmailValid) {
            return res.status(400).send("Email o Contraseña invalidos")//200
        }

        const [findUser] = await userModel.find({ email: email })
        const dbPassword = findUser.password

        await bcrypt.compare(password, dbPassword)

        const token = jwt.sign({ email: findUser.email, id: findUser._id }, "secret-key")

        res.cookie("jwt", token)
        res.send(token)

    } catch (err) {
        const custom_error = new AuthError(err.message || "No Autorizado")
        next(custom_error)
    }
}

const signupController = async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const isEmailValid = validator.isEmail(email)
    const isPasswordValid = validator.isStrongPassword(password)

    if (!isEmailValid || !isPasswordValid) {
        res.status(400).send("Email o Contraseña invalidos")//200
    } else {
        try {
            const data = await bcrypt.hash(password, 10)
            const newUser = await userModel.create({
                email,
                password: data
            })
            res.status(201).send(newUser)
        } catch (err) {
            return res.status(500).send("Hubo un error generando el hash")
        }
    }
}

export { loginController, signupController }