import mongoose from "mongoose"

const empresaSchema = new mongoose.Schema({

  tipo: {
    type: String,
    enum: ["coletora", "destino"],
    required: true
  },

  razaoSocial: {
    type: String,
    required: true
  },

  cnpj: {
    type: String,
    required: true
  },

  telefone: String,

  email: String,

  endereco: String,

  licencaAmbiental: String,

  dataVencimentoLicenca: Date,

  responsavelTecnico: String

}, { timestamps: true })

export default mongoose.model("Empresa", empresaSchema)