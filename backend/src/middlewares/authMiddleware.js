import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

export default async function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" })
  }

  const token = authHeader.split(" ")[1]

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const usuario = await Usuario.findById(decoded.id)

    req.usuario = usuario

    next()

  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" })
  }
}