import api from "./api";

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

interface RespuestaAuth {
  mensaje: string;
  token: string;
  usuario: Usuario;
}

export const registrarUsuario = async (
  nombre: string,
  email: string,
  password: string
): Promise<RespuestaAuth> => {
  const respuesta = await api.post<RespuestaAuth>(
    "/auth/registro",
    { nombre, email, password }
  );

  return respuesta.data;
};

export const iniciarSesion = async (
  email: string,
  password: string
): Promise<RespuestaAuth> => {
  const respuesta = await api.post<RespuestaAuth>(
    "/auth/login",
    { email, password }
  );

  return respuesta.data;
};

export const guardarSesion = (
  datos: RespuestaAuth
) => {
  sessionStorage.setItem("token", datos.token);
  sessionStorage.setItem(
    "usuario",
    JSON.stringify(datos.usuario)
  );
};

export const cerrarSesion = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("usuario");
};