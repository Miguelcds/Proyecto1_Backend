const mongoose = require("mongoose");

const bcrypt = require("bcrypt"); // Libreria para ecriptacion

const userSchema = new mongoose.Schema(

    {
        name:{type: String, trim: true, require: true},
        password:{
            type: String, 
            trim:true, 
            require:true,
            minlength:[8, "La contraseña tiene que tener al menos 8 caracteres"]
        },
        email:{
            type:String,
            trim:true,
            require:true,
            unique:true, // Solo puede existir el e-mail 1 vez
        },
        profileImgUrl:{type:String,trim:true,default:"https://res.cloudinary.com/dj5ud5w1i/image/upload/v1763762215/Profile_Default_zzzzbe.jpg"},
        profileImgId:{type:String, trim:true, require:false},
        favorites:[{type:mongoose.Types.ObjectId, ref: "Song"}], // 
        role:{type:String, enum:["admin", "user"], default:"user"} // Para Facilitar esta parte: El primer admin se insertará manualmente modificando el documento directamente en MongoAtlas. Podrá tener el rol “admin”
    },
    {
        timestamps:true
    }

)

userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;