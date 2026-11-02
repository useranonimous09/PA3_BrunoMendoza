import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/User.js";

// Generar token JWT
const generarToken = (usuarioId) => {
  return jwt.sign(
    { id: usuarioId },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

// REGISTRAR USUARIO
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (
      typeof nombre !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !nombre.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        mensaje: "El correo electrónico no es válido"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener mínimo 8 caracteres"
      });
    }

    const correo = email.trim().toLowerCase();

    const usuarioExistente = await Usuario.findOne({
      email: correo
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado"
      });
    }

    // Cifrado unidireccional mediante hash
    const passwordHash = await bcrypt.hash(password, 12);

    const usuario = await Usuario.create({
      nombre: nombre.trim(),
      email: correo,
      password: passwordHash
    });

    const token = generarToken(usuario._id.toString());

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado"
      });
    }

    console.error("Error de registro:", error.message);

    return res.status(500).json({
      mensaje: "Error interno al registrar usuario"
    });
  }
};

// INICIAR SESIÓN
export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Correo y contraseña obligatorios"
      });
    }

    const usuario = await Usuario.findOne({
      email: email.trim().toLowerCase()
    }).select("+password");

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const esValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!esValida) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const token = generarToken(usuario._id.toString());

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error("Error de login:", error.message);

    return res.status(500).json({
      mensaje: "Error interno al iniciar sesión"
    });
  }
};