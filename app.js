require("dotenv").config(); // Configurar gestor de claves
const PORT = process.env.PORT;
const express = require("express"); // Configurar y almacenar el gestor de bbdd
const {connectDB } = require("./src/config/db");
const userRouter = require("./src/api/routes/user.routes");
const songRouter = require("./src/api/routes/song.routes")
const { connectCloudinary } = require("./src/config/cloudinary");
connectCloudinary();
connectDB();
const app = express(); // Almacenamos en una constante express
app.use(express.json()) // Indicamos/habilitamos la herramienta json de express


// Rutas Usuarios

app.use("/api/v1/users", userRouter);

// Rutas Canciones

app.use("/api/v1/songs", songRouter);


// Rutas Sin Respuesta

app.use((req, res) =>{
    res.status(404).json({error: "Route not found!!"})
})



// Funcion Next por algun Error

app.use((error,req,res,next) => res.status(error.status || 500).json(error.message || "Unexpected Error"))



// Puerto de Escucha

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

