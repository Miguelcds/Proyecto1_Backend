// Configurar e instancair Mongoose
const mongoose = require("mongoose");

// Funcion asyn para conectar con la BBDD

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Conectado con la BBDD✅");
        
    } catch (error) {
        console.log("Algo salio mal, Intentalo mas tarde!");
        
    }
}

module.exports = {connectDB};