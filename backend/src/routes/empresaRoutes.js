import express from "express"
import { atualizarEmpresaPorId, criarEmpresa, deletarEmpresaPorId, listarEmpresaPorId, listarEmpresas } from "../controllers/empresaController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const router = express.Router()

// só admin pode cadastrar empresa
router.post("/", authMiddleware, roleMiddleware("admin"), criarEmpresa)

router.get("/", listarEmpresas)
router.get("/:id", listarEmpresaPorId)
router.put("/:id", atualizarEmpresaPorId)
router.delete("/:id", deletarEmpresaPorId)

export default router