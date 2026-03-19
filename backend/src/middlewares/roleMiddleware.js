export default function roleMiddleware(...tiposPermitidos) {

  return (req, res, next) => {

    if (!req.usuario) {
      return res.status(401).json({ erro: "Não autenticado" })
    }

    if (!tiposPermitidos.includes(req.usuario.tipo)) {
      return res.status(403).json({
        erro: "Sem permissão"
      })
    }

    next()
  }
}