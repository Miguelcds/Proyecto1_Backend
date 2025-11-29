const cloudinary = require("cloudinary").v2;

const deleteImgCloudinary = async (posterId) => {
    if(!posterId) return; // Si no tiene una imagen asociada retornamos
    try {
        await cloudinary.uploader.destroy(posterId);
    } catch (error) {
        console.warn("[Cloudinary] No se pudo eliminar:", posterId, error.message);
    }
}

module.exports = {deleteImgCloudinary};