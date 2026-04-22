import session from "express-session"

const sessionMiddleware = session({
    secret: "123456",
    saveUninitialized: false,
    resave: false,
    /* store: mongoStore */
})

export default sessionMiddleware