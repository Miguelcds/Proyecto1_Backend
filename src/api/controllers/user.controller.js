const User = require("../models/user.model");

const {deleteImgCloudinary} = require("../../utils/cloudinary.util")

const bcrypt = require("bcrypt");

const { generateToken } = require("../../utils/token");

// Registrar Nuevos Usuarios

const registerUser = async (req, res) => {
  try {
    // Controlo que no se pueda introducir un rol al registrarse

    if (req.body.role) delete req.body.role;

    // Verificar si el email ya esta registrado

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist)
      return res.status(400).json({ Error: "El Usuario/Email ya existe" });

    // Crear y guardar en caso de que no exista

    const user = new User(req.body);

    // Si llega una imagen

    if (req.file) {
      user.profileImgUrl = req.file.path;
      user.profileImgId = req.file.filename;
    }

    const userDB = await user.save();

    res.status(201).json(userDB);
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error Registrando el Usuario --> ${error}` });
  }
};

// Gestion De Inicio De Sesion

const loginUser = async (req, res) => {
  try {
    // 1. Buscar Email

    const user = await User.findOne({ email: req.body.email });

    // 2. Comprobamos la existencia del Usuario, si no existe arrojamos error

    if (!user) {
      return res.status(400).json("Usuario o contraseña incorrecta");
    }

    //3. Comparamos la Contraseña introducida con la que esta guardada en la BBDD

    const validPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).json("Usuario o contraseña incorrecta");
    }

    //4. Genertamos Token si la contraseña es valida que otorga los permisos correspondiente al rol que tenga

    const token = generateToken(user._id, user.email);

    // 5. Devolvemos el Token como respuesta

    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json(`Error en el login --> ${error}`);
  }
};

// Borrado De Usuario solo si es su usuario

const deleteUser = async (req, res, next) => {
  try {

    if(req.user.role === "admin"){
      return res.status(400).json("No Puedes Borrar tu perfil de Adim")
    }
  
    const requestId = req.user.id;

    const isDeleted = await User.findByIdAndDelete(requestId);

    if(isDeleted.profileImgId){
      await deleteImgCloudinary(isDeleted.profileImgId);
    }

    res.status(200).json("User Deleted ✅");
  } catch (error) {
    res.status(400).json("⚠️ Error Borrando el Usuario --> " + error);
  }
};


// Funcion Obtener Datos Del Propio Usuario


const getUser = async (req, res, next) =>{
  try {
    const requestId = req.user.id;

    const user = await User.findById(requestId).populate("favorites");

    return res.status(200).json(user)


  } catch (error) {
    res.status(400).json("Erro Obteniendo tus Datos")
  }
}


// Actualizar User

const addFavorites = async (req, res, next) => {

  try {
    const requestId = req.user.id;

    if(req.body.role) delete req.body.role;
    if(req.body.email) delete req.body.email;
    if(req.body.password) delete req.body.password;
    if(req.file) delete req.file;

    const favs = req.body.favorites;

    const update = await User.findByIdAndUpdate(requestId, {$addToSet:{favorites:{$each: favs}}}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(update)

  } catch (error) {
    res.status(400).json("Error Añadiendo a Favoritos")
  }
}



// ********** Funciones ADMIN **********

// Funcion Para Borrado De Usuarios, solo Valido Para Roles de Admin

const deleteUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const requestId = req.user.id;


    if(id === requestId){
      return res.status(400).json("No Puedes Borrarte a ti mismo Admin!! Are you Crazy?!")
    }

    // Comprobacion de la existecia del Usuario

    const user = await User.findById(id);

    if (!user){
      return res.status(400).json({ error: "Usuario no encontrado" })
    }

    // Borramos Usuario
    const isDeleted = await User.findByIdAndDelete(id);

    if(isDeleted){
      await deleteImgCloudinary(isDeleted.profileImgId);
    }
      
    return res.status(200).json("User Deleted");

  } catch (error) {
    res.status(400).json("Error Borrando el Usuario");
  }
};

// Funcion Para Obtener Todos los Usuarios, Valido Solo Para Roles Admin

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("favorites");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error Obteniendo todos los usuarios" });
  }
};

// Funcion Para Actualizar Algun Datos Solo Admin

const updateUserAdm = async (req, res, next) => {
  try {

    if(req.params === req.user.id ){
      return res.status(400).json("No puedes modificar tus propios datos de ADMI desde aqui, tendras que hacerlo desde otra cuenta para asegurar que siempre exista otro admin")
    }
    const update = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return res.status(404).json({ error: "Usuario No localizado" });
    }

    res.status(200).json(update)
  } catch (error) {
    res.status(400).json({ error: "Error Actualizando Datos" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
  getUsers,
  updateUserAdm,
  deleteUserAdmin,
  addFavorites
};
