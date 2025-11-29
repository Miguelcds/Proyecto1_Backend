const cloudinary = require("cloudinary").v2;


// RALIZAR CONEXION CON CLOUDINARY
const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Conectado Con exito a Claudinary ✅");
  } catch (error) {
     console.log("Error al conectar con Claudinary ⚠️");
  }
};

module.exports = { connectCloudinary };
