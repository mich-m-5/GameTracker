// backend/models/Juego.js
const mongoose = require("mongoose");

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  tipo: { type: String },
  plataforma: { type: String },
  genero: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  // avgRating será el promedio calculado de reseñas
  avgRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  portada: { type: String }
});

module.exports = mongoose.model("Juego", juegoSchema);
