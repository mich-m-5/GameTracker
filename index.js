const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();


const app = express();


app.use(cors());              // conexión entre frontend (3000) y backend (4000)
app.use(express.json());      


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar con MongoDB:", error));


app.use("/api/juegos", require("./routes/juegos"));
app.use("/api/resenas", require("./routes/resenas"));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor funcionando en puerto ${PORT}`));
