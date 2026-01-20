
# API REST – Node.js, Express & MongoDB

** Descripción del Proyecto **

Esta API REST está desarrollada con Node.js, Express y MongoDB/Mongoose.
Proporciona un sistema completo de gestión de usuarios, autenticación mediante JWT, subida y gestión de imágenes con Cloudinary, CRUD de canciones y un sistema de favoritos sin duplicados.
El proyecto sigue una arquitectura modular y escalable, ideal para entornos de producción y aprendizaje avanzado.


# Características Principales

- Sistema de autenticación y autorización (JWT)

- Gestión de roles (user / admin)

- CRUD completo de Usuarios

- CRUD completo de Canciones

- Subida de imágenes con Cloudinary + Multer

- Sistema de Favoritos con prevención de duplicados

- Seeds automáticos para carga inicial

- Validación de datos con Mongoose

- Arquitectura modular y organizada en capas


# Tecnologías Utilizadas

- Node.js

- Express

- MongoDB + Mongoose

- Cloudinary

- Multer

- JWT (jsonwebtoken)

- bcrypt

- dotenv

- Nodem

# Estructura 

.
├── app.js
├── package.json
├── package-lock.json
├── .env
└── src/
    ├── api/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── validators/
    ├── config/
    ├── middleware/
    ├── utils/
    │   └── seed/
    └── cloudinary/


⚙️ Instalación y Configuración

1. Clonar el repositorio

git clone <url-del-repositorio>

cd proyecto-backend

2. Instalar dependencias

npm install

3. Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto:

PORT=3000

DB_URL=mongodb+srv://...

JWT_SECRET=tu_clave_secreta

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

▶️ Ejecución del Proyecto

- Modo desarrollo
npm run dev

- Modo producción
npm start

- Ejecutar el Seed (canciones)
npm run seed

👤 Endpoints de Usuario
POST /api/users/register

- Registra un nuevo usuario.
Admite multipart/form-data para subir imagen de perfil.

POST /api/users/login

Devuelve token JWT.

GET /api/users/me

Obtiene los datos del usuario autenticado.

POST /api/users/favourites

Añade favoritos sin duplicados:

{
  "favorites": ["idSong1", "idSong2"]
}

DELETE /api/users/admin/:id

Elimina un usuario (solo admins).

🎵 Endpoints de Canciones

GET /api/songs --> Obtiene todas las canciones.

POST /api/songs --> Crea una canción.

PATCH /api/songs/:id --> Actualiza una canción.

DELETE /api/songs/:id --> Elimina una canción.

🧱 Modelos Principales
User
{
  name: String,
  email: String,
  password: String,
  profileImgUrl: String,
  profileImgId: String,
  favorites: [{ type: ObjectId, ref: "Song" }],
  role: { type: String, default: "user" }
}

Song
{
  name: String,
  artist: String,
  genre: String,
  releaseDate: Number,
  duration: Number
}

☁️ Subida de Imágenes

El proyecto utiliza Cloudinary a través de multer-storage-cloudinary, permitiendo:

Guardar fotos de perfil

Eliminar imágenes al borrar un usuario

Reemplazar imágenes al actualizar

🛡️ Seguridad

Contraseñas encriptadas con bcrypt

Tokens seguros mediante JWT

Protección de rutas con middlewares

Sanitización de campos sensibles en actualizaciones (no se permite cambiar rol, email o password desde rutas no autorizadas)

🧹 Buenas Prácticas Aplicadas

Código modular y desacoplado

Uso de controladores y rutas por separado

Validación Mongoose + Sanitización

Seeds para datos iniciales

Eliminación automática de imágenes en Cloudinary al borrar usuarios

*** Subire datos sensibles como el .env y el seed por ser un proyecto educativo 

📜 Licencia

*** Proyecto de uso educativo ***

👨‍💻 Autor

Desarrollado por Joao Miguel Costa Da Silva
