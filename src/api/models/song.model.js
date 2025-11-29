const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  artist: { type: String, require: true, trim: true },
  genre: {
    type: String,
    enum: [
      "Pop",
      "Rock",
      "Hip-Hop",
      "Rap",
      "R&B",
      "Soul",
      "Reggaeton",
      "Trap",
      "Electrónica",
      "House",
      "Techno",
      "Jazz",
      "Blues",
      "Country",
      "Funk",
      "Disco",
      "Clásica",
      "Metal",
      "Punk",
      "Indie",
      "K-Pop",
      "Latin",
      "Folk",
      "Reggae",
      "Ska",
      "Gospel",
      "Ambient",
      "Lo-Fi",
    ],
    required: true,
    trim: true,
  },
  releaseDate:{type:Number, requiere:false, trim:true},
  duration:{type:Number, require:false}
},
{
  timestamps:true
});


const Song = mongoose.model("Song", songSchema);

module.exports = Song;