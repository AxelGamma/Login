import express from 'express'
import controller from '../controller/controller.js'

const router = express.Router()

router.get('/', controller.home)

router.get('/auth/login', controller.login)
router.post('/auth/login', controller.loginPost)

export default router