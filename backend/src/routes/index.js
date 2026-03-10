import express from "express"

import empresaRoutes from "./empresaRoutes.js"

const router = express.Router()

router.use("/empresas", empresaRoutes)

export default router