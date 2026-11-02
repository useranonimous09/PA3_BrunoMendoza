import mongoose from "mongoose";

const ropaSchema = new mongoose.Schema({
  Ropa: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    enum: ["Camisas", "Pantalones", "Otros"],
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  talla: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: {
    type: String,
    default: ""
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Ropa", ropaSchema, "Ropa");