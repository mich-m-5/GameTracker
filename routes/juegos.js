const express = require("express");
const router = express.Router();
const Juego = require("../models/Juego");
const Resena = require("../models/Resena"); // Asegúrate de tener este modelo

// --- Obtener todos los juegos ---
router.get("/", async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos", error: error.message });
  }
});

// --- Agregar un juego ---
router.post("/", async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar el juego", error: error.message });
  }
});

// --- Editar un juego ---
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al editar el juego", error: error.message });
  }
});

// --- Eliminar un juego ---
router.delete("/:id", async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el juego", error: error.message });
  }
});

// --- Ranking ---
router.get("/ranking", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const by = req.query.by === "reviewCount" ? "reviewCount" : "avgRating";
    const ranking = await Juego.find().sort({ [by]: -1 }).limit(limit);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ranking", error: error.message });
  }
});

// --- Obtener reseñas de un juego ---
router.get("/:id/resenas", async (req, res) => {
  try {
    const juegoId = req.params.id;
    const resenas = await Resena.find({ juegoId });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error: error.message });
  }
});

// --- Agregar reseña a un juego ---
router.post("/:id/resena", async (req, res) => {
  try {
    const juegoId = req.params.id;
    const { texto, usuario = "Anónimo", rating = 5 } = req.body;

    if (!texto) return res.status(400).json({ message: "El texto es obligatorio" });

    const nuevaResena = new Resena({ juegoId, texto, usuario, estrellas: rating });
    await nuevaResena.save();

    // Actualizar promedio y cantidad de reseñas en Juego
    const todas = await Resena.find({ juegoId });
    const avgRating = todas.reduce((acc, r) => acc + r.estrellas, 0) / todas.length;
    const reviewCount = todas.length;
    await Juego.findByIdAndUpdate(juegoId, { avgRating, reviewCount });

    res.status(201).json(nuevaResena);
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res.status(500).json({ message: "Error al crear la reseña", error: error.message });
  }
});

module.exports = router;
