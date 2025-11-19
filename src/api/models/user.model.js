const mongoose = require("mongoose");

const bcrypt = require("bcrypt"); // Libreria para ecriptacion

const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(

    {
        name:{type: String, trim: true, requiere: true},
        password:{
            type: String, 
            trim:true, 
            require:true,
            minlength:[8, "La contraseña tiene debe tener al menos 8 caracteres"]
        },
        email:{
            type:String,
            trim:true,
            require:true,
            unique:true, // Solo puede existir el e-mail 1 vez
        },
        role:{type:String, enum:["admin", "user"], default:"user"} // Para Facilitar esta parte: El primer admin se insertará manualmente modificando el documento directamente en MongoAtlas. Podrá tener el rol “admin”
    }

)