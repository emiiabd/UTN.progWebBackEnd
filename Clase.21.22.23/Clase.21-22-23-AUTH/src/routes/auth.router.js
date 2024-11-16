import express from "express";
import { 
  forgotPasswordController, 
  loginController, 
  registerUserController, 
  resetTokenController, 
  verifyMailValidationTokenController 
} from "../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post('/register', registerUserController)
authRouter.get('/verify/:verification_token', verifyMailValidationTokenController)
authRouter.post('/login', loginController)
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.put('/reset-password/:token', resetTokenController)

/*
resetTokennController

Obtener del body la password
verificar el reset token
buscar al usuario con el email del token
encriptar la password
modificar la password del usuario
guiardar la nueva contrase;a en la DB
*/

export default authRouter