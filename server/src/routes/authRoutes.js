import express from "express";

import {
  registrarUsuario,
  iniciarSesion
} from "../controllers/authController.js";

const router = express.Router();

router.post("/registro", registrarUsuario);
router.post("/login", iniciarSesion);

export default router;