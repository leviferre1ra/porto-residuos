import express from "express"
import { criarEmpresa, listarEmpresas } from "../controllers/empresaController.js"

const router = express.Router()

router.post("/", criarEmpresa)

router.get("/", listarEmpresas)

export default router