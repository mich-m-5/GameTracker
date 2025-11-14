// backend/routes/resenas.js
const express = require("express");
const router = express.Router();
const Resena = require("../models/Resena");
const Juego = require("../models/Juegos");

// Obtener reseñas (por juego opcional)
router.get("/", async (req, res) => {
  try {
    const { juegoId } = req.query;
    const filtro = juegoId ? { juegoId } : {};
    const resenas = await Resena.find(filtro).sort({ fecha: -1 });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas", error });
  }
});

// Agregar reseña => además recalcula avgRating y reviewCount del juego
router.post("/", async (req, res) => {
  try {
    const nueva = new Resena(req.body);
    await nueva.save();

    // Recalcular promedio y count
    const agregacion = await Resena.aggregate([
      { $match: { juegoId: nueva.juegoId } },
      { $group: {
          _id: "$juegoId",
          avg: { $avg: "$estrellas" },
          count: { $sum: 1 }
      } }])
      // Después de guardar una nueva reseña
      const nuevaResena = await Reseña.create(req.body);
    //  🔄 Recalcular el promedio de estrellas
      const resenasJuego = await Reseña.find({ juego: req.body.juego });
      const promedio =
      resenasJuego.reduce((acc, r) => acc + r.estrellas, 0) / resenasJuego.length;

      await Juego.findByIdAndUpdate(req.body.juego, { promedioEstrellas: promedio });

      res.json(nuevaResena);


    if (agregacion.length > 0) {
      const { avg, count } = agregacion[0];
      await Juego.findByIdAndUpdate(nueva.juegoId, {
        avgRating: Number(avg.toFixed(2)),
        reviewCount: count
      });
    }

    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error al agregar reseña:", error);
    res.status(400).json({ message: "Error al agregar reseña", error });
  }
});

module.exports = router;
