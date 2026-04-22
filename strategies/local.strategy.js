import bcrypt from "bcrypt"
import validator from "validator"
import LocalStrategy from "passport-local"

import userModel from "../models/user.model.js"
import AuthError from "../errors/AuthError.js"

const config = {
    usernameField: 'email',
    passwordField: 'password'
}

const localStrategyCallback = async (email, password, cb) => {

    try {

        const pass = password

        const isEmailValid = validator.isEmail(email)

        if (!isEmailValid) {
            return cb(null, false, { message: 'Invalid Email' });
        }

        const [findUser] = await userModel.find({ email: email })
        const dbPassword = findUser.password

        await bcrypt.compare(pass, dbPassword)

        return cb(null, findUser)
    } catch (err) {
        const custom_error = new AuthError(err.message || "No Autorizado")
        return cb(custom_error)
    }
}

const localStrategy = new LocalStrategy(config, localStrategyCallback)

export default localStrategy