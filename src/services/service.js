import model from '../models/model.js'

import bcrypt from 'bcrypt'

async function loginValidacion(username, password) {
   try {
      //Validamos los datos de entrada
      validation.username(username)
      validation.password(password)

      //Validamos que el usuario exista en la base de datos
      const userExist = await model.getUser(username)

      //Si el usuario exits
      if (!userExist) throw new Error('Usuario no existe')
      
      //Valida la password
      const isValidPassword = await bcrypt.compare(password, userExist.password)

      //Si la password no es valida
      if (!isValidPassword) throw new Error('Password incorrecto')
      
      //Devolvemos el usuario sin la password
      const {
         password: _,
         ...rest
      } = userExist

      return rest
   
   } catch (err) {
      throw err
   }
}

class validation{
   static username(username) {
      if (typeof username !== 'string') throw new Error('El usuario debe ser un texto')
      if (username.length <4) throw new Error('El usuario debe tener al menos 4 caracteres')
   }
   
   static password(password) {
      if (typeof password !== 'string') throw new Error('La password debe ser un texto')
      if (password.length < 8) throw new Error('La password debe tener al menos 8 caracteres')
   }
}

export default  {
   loginValidacion
}