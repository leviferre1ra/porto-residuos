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


// Read
export const listarChamados = asyncHandler(async (req, res) => {
  // Garante que a rota está protegida e temos um usuário
  if (!req.usuario) {
    return res.status(401).json({ erro: "Não autenticado" });
  }

  const tipoUsuario = String(req.usuario.tipo || "").toLowerCase();

  // Monta o filtro base
  const filtro = {};

  // Regra de visibilidade: coletora vê apenas os próprios chamados
  if (tipoUsuario === "coletora") {
    if (!req.usuario.empresaId) {
      return res.status(403).json({ erro: "Usuário coletora sem empresa vinculada" });
    }
    filtro.empresaColetora = req.usuario.empresaId;
  }
  // Se for admin → sem filtro adicional (vê tudo)

  // Paginação
  const page = Number.parseInt(req.query.page, 10) || 1;
  const limit = Number.parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // (Opcional) Filtros adicionais por query — sempre adicionativos
  // Ex.: /chamados?status=aprovado
  if (req.query.status) {
    filtro.status = req.query.status;
  }
  // Ex.: /chamados?empresaDestino=<id>
  if (req.query.empresaDestino) {
    filtro.empresaDestino = req.query.empresaDestino;
  }
  // Ex.: /chamados?de=2025-01-01&ate=2025-01-31
  if (req.query.de || req.query.ate) {
    filtro.createdAt = {};
    if (req.query.de) filtro.createdAt.$gte = new Date(req.query.de);
    if (req.query.ate) filtro.createdAt.$lte = new Date(req.query.ate);
  }

  // Conta apenas o universo permitido ao usuário
  const total = await Chamado.countDocuments(filtro);

  // Busca paginada com o mesmo filtro (mantém consistência com total)
  const chamados = await Chamado.find(filtro)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("empresaColetora", "razaoSocial cnpj tipo") // seleciona campos mínimos necessários
    .populate("empresaDestino", "razaoSocial cnpj tipo")
    .lean(); // performance: objetos simples

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return res.json({
    chamados,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
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
