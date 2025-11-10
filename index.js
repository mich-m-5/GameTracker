const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const conectarDB = require("./config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
conectarDB();

// Rutas
app.use("/api/juegos", require("./routes/juegos"));
app.use("/api/resenas", require("./routes/reseñas"));

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor funcionando en puerto ${PORT}`));
