export type CategoriaRopa = "Camisas" | "Pantalones" | "Otros";

// Ropa almacenada en MongoDB
export interface Ropa {
  _id: string;
  Ropa: string;
  categoria: CategoriaRopa;
  precio: number;
  talla: string;
  stock: number;
  imagen: string;
  usuario: string;
}

// Datos que se envían para registrar una prenda
export type NuevaRopa = Pick<
  Ropa,
  "Ropa" | "categoria" | "precio" | "talla" | "stock" | "imagen"
>;

// Productos temporales para el diseño del Home
export interface RopaCatalogo {
  idRopa: number;
  ropa: string;
  categoria: CategoriaRopa;
  precio: number;
  imagen: string;
}