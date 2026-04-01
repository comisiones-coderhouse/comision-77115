import validator from "validator"
import userModel from "../models/user.model.js"


const loginController = (req, res) => {
    req.session.usuario = "horacio"
    res.send("Login exitoso!")
}

const signupController = (req, res) => {

    //https://www.npmjs.com/package/bcrypt
    
    const email = req.body.email
    const password = req.body.password

    //validator.metodo(string) => booleano
    const isEmailValid = validator.isEmail(email)
    const isPasswordValid = validator.isStrongPassword(password)

    if (!isEmailValid || !isPasswordValid) {
        //200 : OK
        //400 : Bad Request
        //404 : Not Found
        res.status(400).send("Email o Contraseña invalidos")//200
    } else {
      /*   
        const newUser = new userModel({
            email,
            password
        })

        newUser.save()
         */

        userModel.create({
            email,
            password
        })
            .then(() => {
                //200 : OK
                //201 : Created
                res.status(201).send("Usuario creado!")
            })
            .catch(() => {
                //500 : Internal Server Error
                res.status(500).send("Error al crear usuario")
            })


    }
}

export { loginController, signupController }