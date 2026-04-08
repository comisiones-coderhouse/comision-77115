import validator from "validator"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"

//ruta -> validacion -> controller


const loginController = async (req, res) => {

    const email = req.body.email

    const password = req.body.password

    const isEmailValid = validator.isEmail(email)

    if (!isEmailValid) {
        return res.status(400).send("Email o Contraseña invalidos")//200
    }

    try {
        /* const findUsers = await userModel.find({ email: email })
        const findUser = findUsers[0] */
        const [findUser] = await userModel.find({ email: email })
        const dbPassword = findUser.password

        await bcrypt.compare(password, dbPassword)

        req.session.usuario = "horacio"
        res.send("Login exitoso!")

    } catch (err) {
        //401 : Anauthorized 
        //403 : Forbidden
        res.status(401).send("No autorizado")
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

        //md5 - sha256 - bcrypt
        //cifrar - hashing : transformar un valor en otro. Ej : 123456 -> e10adc3949ba59abbe56e057f20f883e
        //encriptar : ponerle una clave a algo.

        /* bcrypt.hash(password, 10, (err, data) => {
            if (err) {
                return res.status(500).send("Hubo un error generando el hash")
            }

            userModel.create({
                email,
                password: data
            })
                .then(() => {
                    res.status(201).send("Usuario creado!")
                })
                .catch((error) => {
                    res.status(500).send(error.message)
                })
        }) */

        /* bcrypt.hash(password, 10)
            .then((data) => {
                userModel.create({
                    email,
                    password: data
                })
                    .then(() => {
                        res.status(201).send("Usuario creado!")
                    })
                    .catch((error) => {
                        res.status(500).send(error.message)
                    })
            })
            .catch((err) => {
                return res.status(500).send("Hubo un error generando el hash")
            }) */

        try {
            const data = await bcrypt.hash(password, 10)
            const newUser = await userModel.create({
                email,
                password: data
            })
            res.status(201).send(newUser)
        } catch (err) {
            console.log(err)
            return res.status(500).send("Hubo un error generando el hash")
        }

    }
}

export { loginController, signupController }



/* 

123456
e10adc3949ba59abbe56e057f20f883e


1234567
fcea920f7412b5da7be0cf42b8c93759

*/