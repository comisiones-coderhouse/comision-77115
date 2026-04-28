import express from "express";
import passport from "passport";

import session from "express-session";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import AuthError from "./errors/AuthError.js";
import localStrategy from "./strategies/local.strategy.js";
import githubStrategy from "./strategies/github.strategy.js";
import cookieParserMiddleware from "./middlewares/cookie-parser.middleware.js";
import jsonBodyMiddleware from "./middlewares/json-body.middleware.js";
import sessionMiddleware from "./middlewares/session.middleware.js";

//Init
const app = express();

//Middlewares
app.use(jsonBodyMiddleware);
app.use(cookieParserMiddleware);
app.use(sessionMiddleware);

app.use(passport.authenticate("session"));
passport.use(githubStrategy);
passport.use(localStrategy);

//en serializeUser el primer parametro "user" viene de lo que te da la estrategia (findUser)
passport.serializeUser((user, done) => {
  console.log("🚀 ~ app.js:26 ~ user:", user);

  //req.session.userId = user._id
  done(null, user._id);
});

//en deserializeUser el primer parametro "id" viene de lo que se guardó en serializeUser (user._id)
passport.deserializeUser((id, done) => {
  console.log("deserializeUser", id);
  done(null, { id });
});

let maintenance = false;

process.stdin.on("data", (data) => {
  const input = data.toString().trim();
  console.log(input);

  if (input == "maintenance-on") {
    maintenance = true;
    console.log("Modo mantenimiento activado");
    console.log(maintenance);
    return;
  }

  if (input == "maintenance-off") {
    maintenance = false;
    console.log("Modo mantenimiento desactivado");
    console.log(maintenance);
    return;
  }

  console.log("No hay un comando disponible con esa entrada");
});

app.use((req, res, next) => {
  if (maintenance) {
    res.status(503).send("Mantenimiento activado");
    return;
  }
  next();
});

//Routes
app.use(userRouter);
app.use(authRouter);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);

//Error handler
app.use((error, _req, res, _next) => {
  console.log("🚀 ~ app.js:38 ~ error:", error);

  res.status(error.code || 500).send(error.message || "Hubo un error general");
});

export default app;
