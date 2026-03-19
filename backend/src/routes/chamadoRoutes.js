import express from "express"
import { criarChamado, listarChamadoPorId, listarChamados } from "../controllers/chamadoController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const router = express.Router() 

// só coletora pode criar chamado
router.post("/", authMiddleware, roleMiddleware("coletora"), criarChamado)

router.get("/", listarChamados)
router.get("/:id", listarChamadoPorId)

export default router