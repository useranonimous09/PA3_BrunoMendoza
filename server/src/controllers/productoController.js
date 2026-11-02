import mongoose from "mongoose";
import ModeloRopa from "../models/Ropa.js";

// LISTAR ROPA
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await ModeloRopa.find({
      usuario: req.usuario._id
    });

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar ropa"
    });
  }
};

// CREAR ROPA
export const crearProducto = async (req, res) => {
  try {
    const {
      Ropa,
      categoria,
      precio,
      talla,
      stock,
      imagen
    } = req.body;

    if (
      typeof Ropa !== "string" ||
      !Ropa.trim() ||
      !["Camisas", "Pantalones", "Otros"].includes(categoria) ||
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio < 0 ||
      typeof talla !== "string" ||
      !talla.trim() ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      (imagen !== undefined && typeof imagen !== "string")
    ) {
      return res.status(400).json({
        mensaje: "Datos de ropa inválidos"
      });
    }

    const producto = await ModeloRopa.create({
      Ropa: Ropa.trim(),
      categoria,
      precio,
      talla: talla.trim(),
      stock,
      imagen: imagen || "",
      usuario: req.usuario._id
    });

    res.status(201).json({
      mensaje: "Ropa registrada correctamente",
      producto
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar ropa"
    });
  }
};

// ELIMINAR ROPA
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        mensaje: "ID inválido"
      });
    }

    const producto = await ModeloRopa.findOneAndDelete({
      _id: id,
      usuario: req.usuario._id
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: "Ropa no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Ropa eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar ropa"
    });
  }
};