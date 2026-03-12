import mongoose from "mongoose"

const chamadoSchema = new mongoose.Schema({

  numeroCRRE: {
    type: String,
    unique: true
  },

  empresaColetora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa"
  },

  empresaDestino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa"
  },

  navio: String,

  imo: String,

  nacionalidade: String,

  agenteMaritimo: String,

  armador: String,

  dataColeta: Date,

  residuo: String,

  categoria: String,

  especificacao: String,

  mtr: String,

  status: {
    type: String,
    enum: [
      "pendente",
      "aguardando_documento",
      "aprovado",
      "recusado"
    ],
    default: "pendente"
  },

  documentos: {
    crreAssinado: String,
    mtr: String,
    cdf: String
  }

}, { timestamps: true })

chamadoSchema.index({ empresaColetora: 1 })
chamadoSchema.index({ empresaDestino: 1 })

export default mongoose.model("Chamado", chamadoSchema)