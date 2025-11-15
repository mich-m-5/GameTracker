// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Cargar variables de entorno (.env)
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors());              // Permite conexión entre frontend (3000) y backend (4000)
app.use(express.json());      // Permite recibir datos JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar con MongoDB:", error));

// Rutas de la API
app.use("/api/juegos", require("./routes/juegos"));
app.use("/api/resenas", require("./routes/resenas"));


// Puerto de servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor funcionando en puerto ${PORT}`));
