const getLandingController = (req, res) => {
    if (req.session.usuario) {
        res.send("Bienvenido " + req.session.usuario)
    } else {
        res.send("Logueate!")
    }
}

const getUserController = (req, res) => {
    res.send("User info")
}

export { getLandingController, getUserController }