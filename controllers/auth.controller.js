import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import AuthError from "../errors/AuthError.js"
import UserDAO from "../dao/user.dao.js"

const loginController = async (req, res, next) => {
    try {
        const token = jwt.sign({ email: req.user.email, id: req.user._id }, "secret-key")

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

            const newUser = await UserDAO.createUser(email, data)

            res.status(201).send(newUser)
        } catch (err) {
            return res.status(500).send("Hubo un error generando el hash")
        }
    }
}

export { loginController, signupController }