export const {
   PORT = 3000,
   SALT_ROUNDS = 10,
   JWT_SECRET = 'ijRJzEwAn69sNbicfUDK'
} = process.env

export default {
   PORT,
   SALT_ROUNDS,
   JWT_SECRET
}