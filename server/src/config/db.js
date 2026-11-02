import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Falta configurar MONGO_URI en .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};