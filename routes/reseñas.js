const express = require("express");
const router = express.Router();
const Reseña = require("../models/Reseña");

// Obtener todas las reseñas
router.get("/", async (req, res) => {
  try {
    const reseñas = await Reseña.find();
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas" });
  }
});

// Agregar una nueva reseña
router.post("/", async (req, res) => {
  try {
    const nuevaReseña = new Reseña(req.body);
    await nuevaReseña.save();
    res.json(nuevaReseña);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar la reseña" });
  }
});

// Editar una reseña
router.put("/:id", async (req, res) => {
  try {
    const reseñaActualizada = await Reseña.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reseñaActualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al editar la reseña" });
  }
});

// Eliminar una reseña
router.delete("/:id", async (req, res) => {
  try {
    await Reseña.findByIdAndDelete(req.params.id);
    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar la reseña" });
  }
});

module.exports = router;
