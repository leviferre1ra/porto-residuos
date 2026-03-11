import Empresa from "../models/Empresa.js"
import asyncHandler from "../utils/asyncHandler.js"
import mongoose from "mongoose"

//Create
export const criarEmpresa = asyncHandler(async (req, res) => {
  const empresa = await Empresa.create(req.body)

  res.status(201).json(empresa)
})

//Read
export const listarEmpresas = asyncHandler(async (req, res) => {
  const empresas = await Empresa.find()

  res.json(empresas)
})

//Read By Id
export const listarEmpresaPorId = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Validar se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'O ID não é válido!' })
  }

  const empresa = await Empresa.findById(id)

  if (!empresa) {
    return res.status(404).json({ message: 'Empresa não encontrada' })
  }

  res.json(empresa)
})

//Update By Id
export const atualizarEmpresaPorId = asyncHandler(async (req, res) => {
  const { id } = req.params

  // validar id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'O ID não é válido!' })
  }

  // atualiza e retorna o novo documento
  const empresaAtualizada = await Empresa.findByIdAndUpdate(id, req.body, {
    new: true,          // retorna o documento atualizado
    runValidators: true // aplica validação do schema
  })

  if (!empresaAtualizada) {
    return res.status(404).json({ message: 'Empresa não encontrada' })
  }

  res.json(empresaAtualizada)
})

//Delete By Id
export const deletarEmpresaPorId = asyncHandler(async (req, res) => {
  const { id } = req.params

  // validar id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'O ID não é válido!' })
  }

  const empresaDeletada = await Empresa.findByIdAndDelete(id)

  if (!empresaDeletada) {
    return res.status(404).json({ message: 'Empresa não encontrada' })
  }

  res.status(200).json({ message: 'Empresa deletada!' })
})