import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ["admin", "coletora"],
    required: true
  },
  empresaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa"
  }
}, { timestamps: true })

export default mongoose.model("Usuario", usuarioSchema)