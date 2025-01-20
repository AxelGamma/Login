import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/config.js'

//Middleware de autenticacion
const authMiddleware = (req, res, next) => {
   //Obtenemos el token

   const token = req.cookies.access_token

   req.session = { user: null }
   
   try {
      const data = jwt.verify(token, JWT_SECRET)
      req.session.user = data
   } catch (err) {
   }

   next() //Llamamos a la siguiente ruta o middleware
}

export default authMiddleware