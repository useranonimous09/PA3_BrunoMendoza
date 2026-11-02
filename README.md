LOOKINGTYLE – Aplicación Web Full-Stack

1. Descripción del proyecto

LOOKINGTYLE es una aplicación web desarrollada para gestionar prendas de ropa mediante una interfaz moderna, intuitiva y adaptable a diferentes dispositivos.

El sistema permite registrar usuarios, iniciar sesión de forma segura y administrar prendas de ropa mediante operaciones de creación, consulta y eliminación, utilizando una base de datos MongoDB.

El proyecto integra React y TypeScript en el frontend, Node.js y Express en el backend y MongoDB con Mongoose para la persistencia de datos.

Proyecto Académico N.º 3 (PA3) – Desarrollo Web Full-Stack.

2. Objetivo

Desarrollar una aplicación web Full-Stack que permita gestionar prendas de ropa de manera segura, integrando una interfaz desarrollada con React y TypeScript, una API REST con Express y una base de datos MongoDB.

La aplicación implementa autenticación mediante JWT, almacenamiento de contraseñas mediante bcryptjs y protección de rutas para garantizar que cada usuario únicamente pueda administrar sus propias prendas.

3. Tecnologías utilizadas

Frontend

React

TypeScript

Vite

React Router DOM

Axios

Lucide React

CSS3

Backend

Node.js

Express

Mongoose

MongoDB

bcryptjs

JSON Web Token (JWT)

dotenv

cors

nodemon

Herramientas

Visual Studio Code

MongoDB Compass

Git y GitHub

npm

4. Estructura del proyecto

PA3_BrunoMendoza/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── Context/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── AdminRopa.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── RopaService.ts
│   │   ├── Types/
│   │   │   └── Ropa.ts
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── productoController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Ropa.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── productoRoutes.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md

5. Requisitos previos

Antes de ejecutar la aplicación, se necesita:

Node.js y npm instalados.

MongoDB Community Server en funcionamiento.

MongoDB Compass para visualizar y administrar los datos.

Visual Studio Code u otro editor compatible.

Git para gestionar el repositorio.

6. Instalación del proyecto

Clonar el repositorio cuando esté publicado:

git clone https://github.com/useranonimous09/PA3_BrunoMendoza.git

cd PA3_BrunoMendoza

Instalar el frontend

cd client
npm install

Instalar el backend

Desde la carpeta principal:

cd server
npm install

Las dependencias se instalarán utilizando los respectivos archivos package.json.

7. Configuración de variables de entorno

Dentro de la carpeta server, crear un archivo .env tomando como referencia .env.example.

Ejemplo:

PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/LOOKINGTYLE
JWT_SECRET=REEMPLAZAR_CON_UN_SECRETO_ALEATORIO_SEGURO

El valor de JWT_SECRET debe reemplazarse por una clave aleatoria segura de al menos 32 caracteres.

Seguridad: el archivo .env contiene configuración privada y no debe subirse al repositorio público. Solamente debe publicarse .env.example.

El frontend utiliza por defecto la API ubicada en:

http://localhost:3000/api

Opcionalmente, esta dirección puede modificarse utilizando la variable de entorno VITE_API_URL.

8. Configuración de MongoDB

Iniciar MongoDB Community Server.

Abrir MongoDB Compass.

Conectarse mediante:

mongodb://localhost:27017

Utilizar la base de datos LOOKINGTYLE.

La aplicación emplea las colecciones:

usuarios: almacena los usuarios registrados.

Ropa: almacena las prendas registradas por cada usuario.

Los documentos se gestionan mediante los modelos de Mongoose.

9. Ejecución de la aplicación

La aplicación requiere ejecutar frontend y backend simultáneamente.

Terminal 1 – Backend

cd server
npm run dev

Backend disponible en:

http://localhost:3000

Terminal 2 – Frontend

cd client
npm start

Frontend disponible en:

http://localhost:5173

Para comprobar el backend:

http://localhost:3000/api

10. Funcionalidades principales

Registro de usuarios

Permite crear una cuenta mediante nombre, correo electrónico y contraseña. Las contraseñas se almacenan utilizando funciones de hash mediante bcryptjs.

Inicio de sesión

Permite validar las credenciales y generar un token JWT para identificar al usuario autenticado.

Protección de rutas

Las operaciones protegidas requieren un token válido enviado mediante:

Authorization: Bearer TOKEN_JWT

Gestión de ropa

Los usuarios autenticados pueden:

Registrar prendas.

Consultar sus prendas.

Eliminar prendas registradas.

Visualizar categoría, precio, talla, stock e imagen.

Las categorías disponibles son:

Camisas

Pantalones

Otros

Cada prenda queda asociada al usuario que la registró.

Control de acceso

Los usuarios solamente pueden consultar y eliminar prendas asociadas a sus propias cuentas.

11. Endpoints de la API REST

Método

Endpoint

Descripción

Autenticación

GET

/api

Comprobar funcionamiento de la API

No

POST

/api/auth/registro

Registrar usuario

No

POST

/api/auth/login

Iniciar sesión

No

GET

/api/perfil

Consultar perfil autenticado

Sí

GET

/api/productos

Listar prendas del usuario

Sí

POST

/api/productos

Crear prenda

Sí

DELETE

/api/productos/:id

Eliminar prenda

Sí

La API responde mediante JSON y utiliza códigos de estado HTTP según el resultado de cada operación.

12. Ejemplo de registro de ropa

Solicitud:

POST /api/productos
Authorization: Bearer TOKEN_JWT
Content-Type: application/json

Cuerpo JSON:

{
  "Ropa": "Camisa Urbana Negra",
  "categoria": "Camisas",
  "precio": 89.90,
  "talla": "M",
  "stock": 15,
  "imagen": ""
}

El backend valida la información y asocia la prenda con el usuario autenticado antes de almacenarla en MongoDB.

13. Pruebas de funcionamiento

Las funcionalidades comprobadas durante el desarrollo incluyen:

Conexión de Express con MongoDB.

Registro de usuarios.

Inicio de sesión con credenciales válidas.

Generación y verificación de JWT.

Rechazo de solicitudes sin token.

Creación y consulta de prendas.

Eliminación de prendas.

Separación de prendas entre diferentes usuarios.

Integración del frontend con el backend.

Compilación de producción del frontend mediante npm run build.

14. Compilación del frontend

Para comprobar la compilación de React y TypeScript:

cd client
npm run build

Vite genera los archivos de producción dentro de client/dist.

15. Seguridad

El proyecto incorpora las siguientes medidas:

Hash de contraseñas mediante bcryptjs.

Autenticación basada en JSON Web Token.

Middleware de protección de rutas.

Validación de datos en el backend.

Restricción de productos según el usuario autenticado.

Variables de entorno para claves secretas y conexión a MongoDB.

Exclusión de archivos privados mediante .gitignore.

16. Repositorio de GitHub

Enlace público: PENDIENTE_DE_AGREGAR_URL_DEL_REPOSITORIO

El repositorio contiene el frontend, el backend, la documentación y los archivos necesarios para instalar y ejecutar LOOKINGTYLE.

17. Conclusión

LOOKINGTYLE integra tecnologías de desarrollo web Full-Stack para implementar una aplicación de gestión de ropa con autenticación y persistencia de datos.

El proyecto demuestra la comunicación entre React, Express y MongoDB, el uso de TypeScript en la interfaz, la creación de endpoints REST y la aplicación de mecanismos básicos de seguridad para proteger usuarios y registros.
