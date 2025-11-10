const express = require("express");
const router = express.Router();
const Juego = require("../models/Juego");

// Obtener todos los juegos
router.get("/", async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
});

// Agregar un nuevo juego
router.post("/", async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar el juego" });
  }
});

// Editar un juego
router.put("/:id", async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al editar el juego" });
  }
});

// Eliminar un juego
router.delete("/:id", async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el juego" });
  }
});

module.exports = router;
