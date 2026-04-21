import { Router } from "express"
import passport from "passport"

import { loginController, signupController } from "../controllers/auth.controller.js"

const router = Router()

router.post("/login", passport.authenticate('local',{
     successRedirect: '/'
})/* , loginController */)
router.post("/signup", signupController)

export default router