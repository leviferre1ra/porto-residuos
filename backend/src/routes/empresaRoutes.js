import express from "express"
import { atualizarEmpresaPorId, criarEmpresa, deletarEmpresaPorId, listarEmpresaPorId, listarEmpresas } from "../controllers/empresaController.js"

const router = express.Router()

router.post("/", criarEmpresa)
router.get("/", listarEmpresas)
router.get("/:id", listarEmpresaPorId)
router.put("/:id", atualizarEmpresaPorId)
router.delete("/:id", deletarEmpresaPorId)
export default router