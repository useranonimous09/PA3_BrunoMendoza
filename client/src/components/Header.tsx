import { useState } from "react";
import {
  ShoppingBag,
  UserRound,
  Menu,
  X,
  ArrowUpRight
} from "lucide-react";

interface NavbarProps {
  onEntrada: () => void;
  onRopa: () => void;
  onLogin: () => void;
}

function Header({ onEntrada, onRopa, onLogin }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navegar = (accion: () => void) => {
    accion();
    setMenuAbierto(false);
  };

  return (
    <>
      <div className="topbar">
      DESCUBRE TU ESTILO
      </div>

      <header className="navbar">
        <button
          className="logo"
          onClick={() => navegar(onEntrada)}
          aria-label="Ir al inicio"
        >
          LOOKING<span>TYLE.</span>
        </button>

        <nav className="nav-links" aria-label="Navegación principal">
          <button onClick={() => navegar(onEntrada)}>
            Inicio
          </button>

          <button onClick={() => navegar(onRopa)}>
            Colección
          </button>

          <button onClick={() => navegar(onRopa)}>
            Productos
          </button>

          <button onClick={() => navegar(onRopa)}>
            Novedades
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="nav-icon"
            onClick={() => navegar(onLogin)}
            aria-label="Mi cuenta"
            title="Iniciar sesión"
          >
            <UserRound size={21} />
          </button>

          <button
            className="nav-icon cart-icon"
            onClick={() => navegar(onRopa)}
            aria-label="Ver colección"
            title="Ver productos"
          >
            <ShoppingBag size={21} />
          </button>

          <button
            className="nav-login"
            onClick={() => navegar(onLogin)}
          >
            Ingresar <ArrowUpRight size={17} />
          </button>

          <button
            className="menu-toggle"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="mobile-navigation"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </header>

      {menuAbierto && (
        <nav
          id="mobile-navigation"
          className="mobile-menu"
          aria-label="Navegación móvil"
        >
          <button onClick={() => navegar(onEntrada)}>
            Inicio
          </button>
          <button onClick={() => navegar(onRopa)}>
            Colección
          </button>
          <button onClick={() => navegar(onRopa)}>
            Productos
          </button>
          <button onClick={() => navegar(onRopa)}>
            Novedades
          </button>
          <button onClick={() => navegar(onLogin)}>
            Iniciar sesión
          </button>
        </nav>
      )}
    </>
  );
}

export default Header;