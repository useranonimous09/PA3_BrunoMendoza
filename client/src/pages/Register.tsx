import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  registrarUsuario,
  guardarSesion
} from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre.trim() || !email.trim() || !password) {
      setMensaje("Completá todos los campos.");
      return;
    }

    if (password.length < 8) {
      setMensaje("La contraseña debe tener mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      setCargando(true);

      const datos = await registrarUsuario(
        nombre.trim(),
        email.trim(),
        password
      );

      guardarSesion(datos);
      navigate("/admin", { replace: true });

    } catch (error) {
      setMensaje(
        axios.isAxiosError(error)
          ? error.response?.data?.mensaje ||
            "No se pudo registrar el usuario."
          : "Ocurrió un error inesperado."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">LOOKINGTYLE</span>
        <h1>Crear cuenta</h1>
        <p>Registrate para administrar tus prendas.</p>

        <form onSubmit={handleSubmit}>
          <label>Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {mensaje && (
            <p className="auth-message" role="alert">{mensaje}</p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;