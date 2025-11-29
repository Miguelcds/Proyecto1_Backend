const songs = require("../../data/songs");

const Song = require("../../api/models/song.model");

const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://miguelcds:PvFdhxeZogxpEJTc@bbddjc.qrxrpjq.mongodb.net/ProjectBackend?retryWrites=true&w=majority&appName=bbddjc";

mongoose
  .connect(DB_URI)
  .then(async () => {
    // 1. Conectarse a la BBDD

    console.log("Conectado a la BBDD ✅");

    // Buscar todas las peliculas de la Coleccion

    const allSongs = await Song.find();

    // Si Existe Peliculas las borramos

    if (allSongs.length) {
      await Song.collection.drop();
      console.log(
        `Borrado del contenido Anterior ejecutado Con Exito! Total Borrado: ${
          +allSongs.length - 1
        }`
      );
    } else {
      console.log("No habia nada que borrar");
    }
  })
  .catch((err) => console.log(`Error Al Borrar los Datos: ${err}`))
  .then(async () => {
    // Usamos la Coleccion de songs para introducir todos los datos
    await Song.insertMany(songs);
    console.log(
      `Nuevos Datos introducidos con exito! Total: ${+songs.length - 1}`
    );
  })
  .catch((err) => console.log(`Error al Crear los Datos ${err}`))
  .finally(() => {
    mongoose.disconnect();
    console.log("Desconectado con exito! ");
  });
