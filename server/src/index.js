import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productoRoutes from "./routes/productoRoutes.js";


import { conectarDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protegerRuta } from "./middlewares/authMiddleware.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "10kb" }));


// Ruta pública de prueba
app.get("/api", (req, res) => {
  res.status(200).json({
    mensaje: "API de LOOKINGTYLE funcionando correctamente"
  });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);

// Ruta protegida de prueba
app.get("/api/perfil", protegerRuta, (req, res) => {
  res.status(200).json({
    mensaje: "Acceso autorizado",
    usuario: {
      id: req.usuario._id,
      nombre: req.usuario.nombre,
      email: req.usuario.email
    }
  });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada"
  });
});

// Iniciar servidor con MongoDB
const iniciarServidor = async () => {
  if (!process.env.JWT_SECRET ||
      process.env.JWT_SECRET.length < 32) {
    console.error("JWT_SECRET debe tener al menos 32 caracteres");
    process.exit(1);
  }

  await conectarDB();

  app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
  });
};

iniciarServidor();