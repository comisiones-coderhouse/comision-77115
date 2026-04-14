import jwt from "jsonwebtoken"

const getLandingController = (req, res,next) => {
    try {

        if (req.cookies && req.cookies.jwt) {

            const data = jwt.verify(req.cookies.jwt, "secret-keys")

            res.send("Bienvenido " + data.email)
        } else {
            res.send("Logueate!")
        }
    } catch (err) {
        //res.status(500).send("Hubo un error 2")//500
        next(err)
    }
}

const getUserController = (req, res) => {
    res.send("User info")
}

export { getLandingController, getUserController }