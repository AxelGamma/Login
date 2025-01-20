import service from '../services/service.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/config.js'

const home = (req, res) => {
   const { user } = req.session
   try {
      if (!user) return res.redirect('/auth/login')
      
      res.setHeader('Cache-Control', 'no-store');
      res.send('Hello world!!')
   } catch (err) {
      res.status(500).send('Error al renderizar la vista')
   }
}

// LOGIN PAGE RENDER
const login = (req, res) => {
   try {
      res.render('login', {title: 'Login'})
   } catch (err) {
      res.status(500).send('Error al renderizar la vista')
   }
}

// LOGIN POST
const loginPost = async (req, res) => {
   const { username, password } = req.body

   try {
      const user = await service.loginValidacion(username, password)

      //CREAMOS EL TOKEN

      const token = jwt.sign({ id: user.id, username: user.username },
         JWT_SECRET, { expiresIn: '1h' })
      
      //CREAMOS LA COOKIE PARA EL TOKEN
      res.cookie('access_token', token, {
         httpOnly: true,
         maxAge: 60 * 60 * 1000,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 1000 * 60 * 60
      }).send({ user, token })
      
   } catch (err) {
      res.status(401). json({message: 'Error al iniciar sesion (controller) ' + err.message})
   }
}

//LOGOUT
const logout = (req, res) => {
   res.clearCookie('access_token').redirect('/auth/login')
}

//VISTA PROTEGIDA

const vistaProtegida = (req, res) => {
   
   try {
      res.render('vistaProtegida', {title: 'Vista protegida'})
   } catch (err) {
      res.status(500).send('Error al renderizar la vista')
   }
}


export default {
   home,
   loginPost,
   login,
   vistaProtegida,
   logout
}  