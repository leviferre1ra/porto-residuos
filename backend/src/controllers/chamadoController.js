import Chamado from "../models/Chamado.js"
import Empresa from "../models/Empresa.js"
import asyncHandler from "../utils/asyncHandler.js"
import mongoose from "mongoose"
import gerarNumeroCRRE from "../utils/gerarNumeroCRRE.js"

//Create
export const criarChamado = asyncHandler(async (req, res) => {

  const { empresaDestino } = req.body


  // verificar se empresa destino existe
  const destino = await Empresa.findById(empresaDestino)

  if (!destino) {
    return res.status(404).json({
      erro: "Empresa destino não encontrada"
    })
  }

  const numeroCRRE = await gerarNumeroCRRE()

  const chamado = await Chamado.create({
    ...req.body,
    empresaColetora: req.usuario.empresaId,
    numeroCRRE
  })

  res.status(201).json(chamado)

})

//Read
export const listarChamados = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Chamado.countDocuments();
  const chamados = await Chamado.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(total / limit);

  res.json({
    chamados,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
});

//Read By Id
export const listarChamadoPorId = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Validar se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'O ID não é válido!' })
  }

  const chamado = await Chamado.findById(id)

  if (!chamado) {
    return res.status(404).json({ message: 'Chamado não encontrado' })
  }

  res.json(chamado)
})
