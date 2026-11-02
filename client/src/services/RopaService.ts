import api from "./api";
import type { Ropa, NuevaRopa } from "../Types/Ropa";

export const listarRopa = async (): Promise<Ropa[]> => {
  const respuesta = await api.get<Ropa[]>("/productos");
  return respuesta.data;
};

export const crearRopa = async (
  datos: NuevaRopa
): Promise<Ropa> => {
  const respuesta = await api.post<{
    mensaje: string;
    producto: Ropa;
  }>("/productos", datos);

  return respuesta.data.producto;
};

export const eliminarRopa = async (
  id: string
): Promise<void> => {
  await api.delete(`/productos/${id}`);
};