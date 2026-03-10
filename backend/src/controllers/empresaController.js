import Empresa from "../models/Empresa.js"
import asyncHandler from "../utils/asyncHandler.js"

export const criarEmpresa = asyncHandler(async (req, res) => {
    
    const empresa = await Empresa.create(req.body)

    res.status(201).json(empresa)
})

export const listarEmpresas = asyncHandler(async (req, res) => {

  const empresas = await Empresa.find()

  res.json(empresas)

})