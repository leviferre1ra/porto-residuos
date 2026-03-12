import Chamado from "../models/Chamado.js"
import Empresa from "../models/Empresa.js"
import asyncHandler from "../utils/asyncHandler.js"
import gerarNumeroCRRE from "../utils/gerarNumeroCRRE.js"

//CREATE
export const criarChamado = asyncHandler(async (req, res) => {

  const { empresaColetora, empresaDestino } = req.body

  // verificar se empresa coletora existe
  const coletora = await Empresa.findById(empresaColetora)

  if (!coletora) {
    return res.status(404).json({
      erro: "Empresa coletora não encontrada"
    })
  }

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
    numeroCRRE
  })

  res.status(201).json(chamado)

})

//READ