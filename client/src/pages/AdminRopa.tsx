import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Trash2, LogOut } from "lucide-react";

import {
  listarRopa,
  crearRopa,
  eliminarRopa
} from "../services/RopaService";

import type {
  Ropa,
  NuevaRopa,
  CategoriaRopa
} from "../Types/Ropa";

function AdminRopa() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Ropa[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [form, setForm] = useState({
    Ropa: "",
    categoria: "Camisas" as CategoriaRopa,
    precio: "",
    talla: "",
    stock: "",
    imagen: ""
  });

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const datos = await listarRopa();
      setProductos(datos);
    } catch {
      setMensaje("No se pudieron cargar las prendas.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarProductos();
  }, []);

  const agregarProducto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");

    const precio = Number(form.precio);
    const stock = Number(form.stock);

    if (
      !form.Ropa.trim() ||
      !form.talla.trim() ||
      form.precio.trim() === "" ||
      form.stock.trim() === "" ||
      !Number.isFinite(precio) ||
      precio < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setMensaje("Completá los datos correctamente.");
      return;
    }

    const nuevaRopa: NuevaRopa = {
      Ropa: form.Ropa.trim(),
      categoria: form.categoria,
      precio,
      talla: form.talla.trim(),
      stock,
      imagen: form.imagen.trim()
    };

    try {
      setGuardando(true);
      const creado = await crearRopa(nuevaRopa);

      setProductos((anteriores) => [creado, ...anteriores]);

      setForm({
        Ropa: "",
        categoria: "Camisas",
        precio: "",
        talla: "",
        stock: "",
        imagen: ""
      });

      setMensaje("Ropa registrada correctamente.");
    } catch (error) {
      setMensaje(
        axios.isAxiosError(error)
          ? error.response?.data?.mensaje || "Error al registrar ropa."
          : "Error al registrar ropa."
      );
    } finally {
      setGuardando(false);
    }
  };

  const borrarProducto = async (id: string) => {
    if (!window.confirm("¿Deseás eliminar esta prenda?")) {
      return;
    }

    try {
      await eliminarRopa(id);
      setProductos((anteriores) =>
        anteriores.filter((producto) => producto._id !== id)
      );
      setMensaje("Ropa eliminada correctamente.");
    } catch {
      setMensaje("No se pudo eliminar la prenda.");
    }
  };

  const salir = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  };

  return (
    <main className="admin-page">
      <div className="admin-container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">LOOKINGTYLE</span>
            <h1>Administración de ropa</h1>
            <p>Gestioná tus prendas desde un solo lugar.</p>
          </div>

          <button className="admin-logout" onClick={salir}>
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>

        <section className="admin-panel">
          <h2>Agregar nueva prenda</h2>

          <form className="admin-form" onSubmit={agregarProducto}>
            <label>
              Ropa
              <input
                type="text"
                value={form.Ropa}
                onChange={(e) =>
                  setForm({ ...form, Ropa: e.target.value })
                }
                placeholder="Ej. Camisa Urbana Negra"
                required
              />
            </label>

            <label>
              Categoría
              <select
                value={form.categoria}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoria: e.target.value as CategoriaRopa
                  })
                }
              >
                <option value="Camisas">Camisas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Otros">Otros</option>
              </select>
            </label>

            <label>
              Precio (S/)
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.precio}
                onChange={(e) =>
                  setForm({ ...form, precio: e.target.value })
                }
                required
              />
            </label>

            <label>
              Talla
              <input
                type="text"
                value={form.talla}
                onChange={(e) =>
                  setForm({ ...form, talla: e.target.value })
                }
                placeholder="Ej. M"
                required
              />
            </label>

            <label>
              Stock
              <input
                type="number"
                step="1"
                min="0"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
                required
              />
            </label>

            <label>
              Imagen (URL opcional)
              <input
                type="text"
                value={form.imagen}
                onChange={(e) =>
                  setForm({ ...form, imagen: e.target.value })
                }
                placeholder="https://..."
              />
            </label>

            <button
              className="admin-add"
              type="submit"
              disabled={guardando}
            >
              <Plus size={18} />
              {guardando ? "Guardando..." : "Agregar ropa"}
            </button>
          </form>

          {mensaje && <p className="admin-message" role="status">{mensaje}</p>}
        </section>

        <section className="admin-panel">
          <h2>Mis prendas ({productos.length})</h2>

          {cargando ? (
            <p>Cargando prendas...</p>
          ) : productos.length === 0 ? (
            <p>Todavía no registraste ninguna prenda.</p>
          ) : (
            <div className="admin-grid">
              {productos.map((producto) => (
                <article className="admin-product" key={producto._id}>
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.Ropa}
                      loading="lazy"
                    />
                  ) : (
                    <div className="admin-no-image">Sin imagen</div>
                  )}

                  <div className="admin-product-info">
                    <span>{producto.categoria}</span>
                    <h3>{producto.Ropa}</h3>
                    <p>Precio: S/ {producto.precio.toFixed(2)}</p>
                    <p>Talla: {producto.talla}</p>
                    <p>Stock: {producto.stock}</p>

                    <button
                      className="admin-delete"
                      onClick={() => borrarProducto(producto._id)}
                    >
                      <Trash2 size={17} /> Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminRopa;