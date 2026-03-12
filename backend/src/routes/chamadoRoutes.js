import express from "express"
import { criarChamado } from "../controllers/chamadoController.js"

const router = express.Router() 

router.post("/", criarChamado)

export default router