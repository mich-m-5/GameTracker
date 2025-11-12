const express = require("express");
const router = express.Router();
const Reseña = require("../models/Resena");

// Obtener reseñas
router.get("/", async (req, res) => {
  try {
    const reseñas = await Reseña.find().populate("juegoId");
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
});

// Agregar reseña
router.post("/", async (req, res) => {
  try {
    const nueva = new Reseña(req.body);
    await nueva.save();
    res.json(nueva);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar reseña" });
  }
});

module.exports = router;
