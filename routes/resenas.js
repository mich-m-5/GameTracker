const express = require("express");
const router = express.Router();
const Resena = require("../models/Resena");
const Juego = require("../models/Juego");
const mongoose = require("mongoose");

// Obtener reseñas por juegoId
router.get("/", async (req, res) => {
  try {
    const { juegoId } = req.query; // viene del frontend
    if (!juegoId) return res.status(400).json({ message: "Falta juegoId" });

    const resenas = await Resena.find({ juegoId }).sort({ createdAt: -1 });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error });
  }
});

// Agregar reseña
router.post("/", async (req, res) => {
  try {
    const { juegoId, texto, estrellas } = req.body;

    if (!juegoId || !texto || estrellas == null) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const nueva = await Resena.create({ juegoId, texto, estrellas });

    // Actualizar promedio y conteo en Juego
    const agregacion = await Resena.aggregate([
      { $match: { juegoId: new mongoose.Types.ObjectId(juegoId) } },
      {
        $group: {
          _id: "$juegoId",
          avg: { $avg: "$estrellas" },
          count: { $sum: 1 }
        }
      }
    ]);

    if (agregacion.length > 0) {
      const { avg, count } = agregacion[0];
      await Juego.findByIdAndUpdate(juegoId, { avgRating: Number(avg.toFixed(2)), reviewCount: count });
    }

    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error al agregar reseña:", error);
    res.status(400).json({ message: "Error al agregar reseña", error });
  }
});

module.exports = router;
