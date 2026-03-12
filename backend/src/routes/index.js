import express from "express"
import empresaRoutes from "./empresaRoutes.js"
import chamadoRoutes from "./chamadoRoutes.js"

const router = express.Router()

// a rota /empresas possui acesso a TODAS as ROTAS de empresaRoutes
router.use("/empresas", empresaRoutes)

// a rota /chamados possui acesso a TODAS as ROTAS de chamadoRoutes
router.use("/chamados", chamadoRoutes)

export default router