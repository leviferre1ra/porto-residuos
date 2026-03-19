import Usuario from "../models/Usuario.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"


//Método de registrar um usuário
export const register = asyncHandler(async (req, res) => {

    const { nome, email, senha, tipo, empresaId } = req.body

    // verificar se já existe
    const usuarioExistente = await Usuario.findOne({ email })

    if (usuarioExistente) {
        return res.status(400).json({ erro: "Usuário já existe" })
    }

    // criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        tipo,
        empresaId
    })

    res.status(201).json({
        message: "Usuário criado com sucesso"
    })

})

//Método de logar um usuário
export const login = asyncHandler(async (req, res) => {

  const { email, senha } = req.body

    // verificar se existe este email no banco
  const usuario = await Usuario.findOne({ email })

  if (!usuario) {
    return res.status(400).json({ erro: "Credenciais inválidas" })
  }

    // verificar no banco se a senha para este email está correta
  const senhaValida = await bcrypt.compare(senha, usuario.senha)

  if (!senhaValida) {
    return res.status(400).json({ erro: "Credenciais inválidas" })
  }

  // gerar token
  const token = jwt.sign(
    { id: usuario._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.json({
    token
  })

})