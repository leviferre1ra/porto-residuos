import Counter from "../models/Counter.js";

export default async function gerarNumeroCRRE() {

    const contador = await Counter.findOneAndUpdate(
        { nome: "crre" },
        { $inc: { sequencia: 1 } },
        { returnDocument: 'after', upsert: true }
    )

    const ano = new Date().getFullYear()

    const numero = String(contador.sequencia).padStart(4, "0")

    return `CRRE-${ano}-${numero}`
}