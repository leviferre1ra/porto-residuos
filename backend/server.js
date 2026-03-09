import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"

const app = express()

app.use(cors())
app.use(express.json())

// conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado com sucesso")
  })
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err)
  })

mongoose.connection.on("connected", () => {
  console.log("Conectado ao MongoDB:", mongoose.connection.name)
})

app.get("/", (req, res) => {
  res.send("API funcionando")
})


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})