// IMPORTAR MODELO SONGS

const Song = require("../models/song.model");

// Creacion De peliculas

const createSong = async (req, res, next) => {
  try {
    const newSong = new Song(req.body);

    const createdSong = await newSong.save();

    res.status(201).json(createdSong);
  } catch (error) {
    res.status(500).json({ error: "Error Creando la Cancion" });
  }
};

// Borrar Peliculas

const deleteSong = async (req, res, next) => {
  try {
    const {id} = req.params;
    const deleted = await Song.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: "Cancion no encontrada" });
    }
    res.status(200).json("Cancion Borrada");
  } catch (error) {
    res.status(500).json({ error: "Error Borrando la Cancion" });
  }
};

// Arrojar Todas Las Peliculas 

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Error Obteniendo todas las canciones" });
  }
};


// Actualizar Peliculas 

const updateSong = async (req, res, next) => {
  try {

    const {id} = req.params;
    const isExist = await Song.findById(id);
    if (!isExist) {
      res.status(404).json({ error: "Cancion no encontrada" });
    }

    const update = await Song.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(update)
  } catch (error) {
    res.status(500).json({ error: "Error Actualizando la Cancion" });

  }
};


module.exports = { createSong, deleteSong, getSongs, updateSong};