import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import type { RopaCatalogo } from "../Types/Ropa";

const ropas: RopaCatalogo[] = [
  {
    idRopa: 1,
    ropa: "Casaca Urbana Classic",
    categoria: "Camisas",
    precio: 189.90,
    imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700",
  },
  {
    idRopa: 2,
    ropa: "Polera Essential",
    categoria: "Camisas",
    precio: 119.90,
    imagen: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=700",
  },
  {
    idRopa: 3,
    ropa: "Polo Oversize",
    categoria: "Camisas",
    precio: 79.90,
    imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
  },
  {
    idRopa: 4,
    ropa: "Conjunto Casual",
    categoria: "Otros",
    precio: 159.90,
    imagen: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
  },
  {
    idRopa: 5,
    ropa: "Zapatillas Urban",
    categoria: "Otros",
    precio: 229.90,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
  {
    idRopa: 6,
    ropa: "Bolso Minimal",
    categoria: "Otros",
    precio: 99.90,
    imagen: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=700",
  },
  {
    idRopa: 7,
    ropa: "Bolso Minimal",
    categoria: "Pantalones",
    precio: 99.90,
    imagen: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=700",
  },
  {
    idRopa: 8,
    ropa: "Pantalones Pitillo",
    categoria: "Pantalones",
    precio: 59.50,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_938860-MPE104977290505_012026-F-pantalones-pitillo-para-hombres.webp?w=700",
  },
  {
    idRopa: 9,
    ropa: "Jeans Holgados",
    categoria: "Pantalones",
    precio: 157.90,
    imagen: "https://m.media-amazon.com/images/I/71QzSvDK0xL._AC_SX569_.jpg?w=700",
  }
];

type Categoria = "Todos" | RopaCatalogo["categoria"];

function Home() {
  const [categoria, setCategoria] = useState<Categoria>("Todos");

  const productosFiltrados = ropas.filter(
    (producto) =>
      categoria === "Todos" || producto.categoria === categoria
  );

  const irCatalogo = () => {
    document.getElementById("catalogo")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <>
    <main>
      <section className="hero" id="inicio">
        <div className="hero-content">
          <span className="eyebrow">NUEVA COLECCIÓN</span>
          <h1 className="title1">
            <span className="estilos">TU ESTILO /</span>
            <span className="reglas">TUS REGLAS</span>
          </h1>
          <p className="tienda">
            Descubre una nueva forma de vestir.
            Moda urbana, diseños únicos y prendas
            para expresar tu personalidad.
          </p>
          <button className="btn-primary" onClick={irCatalogo}>
            Explorar colección <ArrowRight size={10} />
          </button>
        </div>
      </section>

      <section className="catalogo container" id="catalogo">
        <div className="section-header">
          <div>
            <span className="eyebrow">DESCUBRE TU LOOK</span>
            <h2>Nuestra colección</h2>
            <p>Prendas seleccionadas para cada estilo.</p>
          </div>
          <span className="product-count">
            {productosFiltrados.length} productos
          </span>
        </div>

        <div className="filters">
          {(["Todos", "Camisas", "Pantalones", "Otros"] as Categoria[])
            .map((item) => (
              <button
                key={item}
                className={categoria === item ? "active" : ""}
                onClick={() => setCategoria(item)}
              >
                {item}
              </button>
            ))}
        </div>

        <div className="product-grid">
          {productosFiltrados.map((producto) => (
            <article className="product-card" key={producto.idRopa}>
              <div className="product-image">
                <img
                  src={producto.imagen}
                  alt={producto.ropa}
                  loading="lazy"
                />
                <span className="product-tag">NUEVO</span>
              </div>

              <div className="product-info">
                <span className="category">
                  {producto.categoria}
                </span>
                <h3>{producto.ropa}</h3>

                <div className="product-bottom">
                  <strong>
                    S/ {producto.precio.toFixed(2)}
                  </strong>
                  <button
                    aria-label={`Ver ${producto.ropa}`}
                    title="Vista de producto (próximamente)"
                    disabled
                  >
                    <ShoppingBag size={19} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="promo">
        <span className="eyebrow">LOOKINGTYLE</span>
        <h2>LA MODA ES TU IDENTIDAD.</h2>
        <p>Vistete diferente. Sientete auténtico.</p>
        <button className="btn-light" onClick={irCatalogo}>
          Ver colección <ArrowRight size={10} />
        </button>
      </section>

      <footer className="footer">
        <div>
          <h3>LookingTyle.</h3>
          <p>Moda urbana para todos los estilos.</p>
        </div>
        <p>© 2026 LookingTyle. Proyecto académico PA3.</p>
      </footer>
    </main>
    </>
  );
}

export default Home;