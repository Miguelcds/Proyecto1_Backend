const User = require("../api/models/user.model");

const {verifyToken} = require("../utils/token");

const isAuth = (allowedRoles = []) =>{
    return async (req, res, next) =>{
        try {

            // Extraer el token del header Authorization, es un opcion del Insomnia

            const token = req.headers.authorization?.replace("Bearer ", "")

            // Si no existe el token o es incorrecto Devolvemos el error

            if(!token){
                return res.status(401).json("No autorizado: token no proporcionado");
            }

            // 2. Verificamos el token usando la clave secreta 

            const decoded = verifyToken(token);

            // 3. Buscar al usuario usando nuestra clase secreta 

            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json("Token inválido o usuario no encontrado");
            }

            // 4. Guardamos la informacion del usuario en la peticion

            req.user = user;

            // 5. Si hay roles definidos, comprobamos si el usuario tiene permiso

            if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
                return res.status(403).json("Acceso denegado: permisos insuficientes")
            }

            // 6. Si todo esta OK, continuamos al Siguiente Middleware o cotrolador

            next();

        } catch (error) {
            return res.status(401).json("Token inválido o sesión expirada");
            
        }
    }
}

module.exports = { isAuth };