const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")

const storage = new CloudinaryStorage({
    cloudinary, // Version de Clouninary
    params: {  // 
        folder: "Profile", // Carpeta Dentro De Cloudinary a la que apuntamos, si no existe se crea
        allowedFormats: ["jpg","png","jpeg","gif","webp"], // Tipo de archivos aceptados
    },
});

const upload = multer({storage});

module.exports ={upload};