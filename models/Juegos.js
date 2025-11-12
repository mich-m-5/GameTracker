const mongoose = require("mongoose");

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  plataforma: { type: String },
  genero: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  puntuacion: { type: Number, min: 0, max: 5 },
  portada: { type: String }
});

module.exports = mongoose.model("Juego", juegoSchema);
