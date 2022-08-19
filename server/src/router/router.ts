import {Router} from 'express'
import userController from '../controllers/UserController'
import { body } from 'express-validator'
import authController from '../controllers/AuthController'
import authMiddleware from '../middlewares/auth-middleware'
const router = new (Router as any)()

router.post('/registration', 
    body('email').isEmail(),
    body('name').isString(),
    body('password').isLength({min: 3}), 
    authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)

router.get('/users', authMiddleware, userController.getUsers)
router.get('/users/:id', authMiddleware, userController.getOne)
router.put('/users', authMiddleware, userController.update)
router.delete('/users/:id', authMiddleware, userController.delete)
router.put('/users/savePicture', authMiddleware, userController.savePicture)
router.put('/users/deletePicture', authMiddleware, userController.deletePicture)

export default router