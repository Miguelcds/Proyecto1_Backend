const jwt = require("jsonwebtoken");


// Generar Nuevo Token

const generateToken = (id, email) =>{
    return jwt.sign(
        {id,email},
        process.env.JWT_SECRET,
        {expiresIn:"1D"}
    )
}

// Varificar si el token es valido

const verifyToken = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {generateToken, verifyToken};
