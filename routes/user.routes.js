import { Router } from "express"
import { getLandingController, getUserController } from "../controllers/user.controller.js"

//Esto es una instancia de la "clase" Router
const router = Router()

router.get("/", getLandingController)
router.get("/user", getUserController)

export default router