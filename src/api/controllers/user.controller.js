const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const { generateToken } = require("../../utils/token");


// Registrar Nuevos Usuarios

const registerUser = async (req, res) => {
    try {

        const user = new User(req.body);

        // Controlo que no se pueda introducir un rol al registrarse

        if(req.body.role) delete req.body.body;

        // Verificar si el email ya esta registrado

        const userExist = await User.findOne({email: user.email});

        if(userExist) res.status(400).json({Error: "El Usuario/Email ya existe"});

        // Crear y guardar en caso de que no exista

        const userDB = await user.save();

        res.status(201).json(userDB);
        
    } catch (error) {
        res.status(400).json({error:"Error Registrando el Usuario"});
    }
}


// Gestion De Inicio De Sesion

const loginUser = async (req, res) =>{
    try {
        // 1. Buscar Email

        const user = await User.findOne({email:req.body.email})
        
    } catch (error) {
        
    }
}