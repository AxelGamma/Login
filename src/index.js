import express from 'express'
import route from './routes/routes.js'
import { PORT } from '../config/config.js'
import compression from 'compression'
import cookieparser from 'cookie-parser'
//Manejar rutas
import path from 'path'
import { fileURLToPath } from 'url'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()

//Middleware para procesar JSON y datos
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Uso de compression
app.use(compression({
   br:true
}))

//Uso de cookie-parser para manejar cookies
app.use(cookieparser())

//Manejo de sessiones 
app.use(authMiddleware)

//Definimos rutas del proyecto
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Vistas

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//Archivos estaticos
app.use(express.static(path.join(__dirname, '../public')))
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

//Rutas
app.use('/', route)

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`)
})