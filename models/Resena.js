const mongoose = require("mongoose");

const ResenaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  texto: { type: String, required: true },
  usuario: { type: String, default: "Anónimo" },
  estrellas: { type: Number, default: 5 },
}, { timestamps: true });

module.exports = mongoose.model("Resena", ResenaSchema);
