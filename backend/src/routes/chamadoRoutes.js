import express from "express"
import { criarChamado, listarChamadoPorId, listarChamados } from "../controllers/chamadoController.js"

const router = express.Router() 

router.post("/", criarChamado)
router.get("/", listarChamados)
router.get("/:id", listarChamadoPorId)

export default router