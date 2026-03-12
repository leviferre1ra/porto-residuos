import mongoose from "mongoose"

const counterSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sequencia: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("Counter", counterSchema)