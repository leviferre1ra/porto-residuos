import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import routes from "./src/routes/index.js"

import errorMiddleware from "./src/middlewares/errorMiddleware.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB conectado")
})
.catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("API funcionando")
})



app.use(errorMiddleware)

app.listen(3000, () => {
  console.log("Servidor rodando")
})
