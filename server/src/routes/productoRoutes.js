import express from "express";

import {
  obtenerProductos,
  crearProducto,
  eliminarProducto
} from "../controllers/productoController.js";

import { protegerRuta } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren JWT
router.use(protegerRuta);

router.get("/", obtenerProductos);
router.post("/", crearProducto);
router.delete("/:id", eliminarProducto);

export default router;