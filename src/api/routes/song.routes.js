const express = require("express");

const {createSong, deleteSong, getSongs, updateSong} = require("../controllers/song.controller");

const {isAuth } = require("../../middlewares/auth.middleware");


const songRouter = express.Router();

songRouter.get("/", getSongs);

songRouter.post("/", createSong);

songRouter.delete("/:id", deleteSong);

songRouter.put("/:id", updateSong);

module.exports = songRouter;
