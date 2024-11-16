import ENVIROMENT from "../config/enviroment.config.js"
import USER from "../models/user.model.js"
import { ResponseBuilder } from "../utils/builders/responseBuilder.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { mailValidator, sendEmail } from "../utils/mail.util.js"
import { response } from "express"
import UserRepositorie from "../repositories/user.repository.js"
import { response200, response201, response400, response403, response404, response500 } from "../utils/responses.util.js"

const registerUserController = async (req, res) =>{
  try{
    const { name, email, password } = req.body

    if(!mailValidator(email) || !name || !password){
      const response = response400('INTERNAL SERVER ERROR', {
        detail: 'Email, nombre o contraseña invalido'
      })
      return res.status(400).json(response)
    }

    const userExist = await UserRepositorie.findUserByEmail(email)

    if(userExist){
      const response = response400('INTERNAL SERVER ERROR', {
        detail: 'Email in use'
      })
      return res.status(400).json(response)
    }
//                            Salt: complejidad con lo que se va a cifrar
    const hashedPwd = await bcrypt.hash(password, 10)
    //console.log({hashedPwd})

// Tokens de verificacion
/* 
    Tokens mas conocidos jwt, {value: 'important'}
    https://jwt.io/
*/
    const verificationToken = jwt.sign({email: email}, ENVIROMENT.JWT_SECRET, {
      expiresIn: '1d'
    })

    const url_verification = `http://localhost:${ENVIROMENT.PORT}/api/auth/verify/${verificationToken}`

    await sendEmail({
      from: "emi@s101.com.ar",
      to: email,
      subject: 'Email de verificacion de cuenta - NO RESPONDER',
      html: `
      <h1>Verificacion de correo electronico </h1>
      <p>Da click en el siguiente link para verificar</p>
      <a 
        style="background-color: black; color: blue; padding: 5px; border-radius: 5px;"
        href="${url_verification}"
      >Click aqui</a>
      `
    })

    const newUser = new USER(
      {
        name,
        email,
        password: hashedPwd,
        verificationToken: verificationToken,
        emailVerified: false
      }
    )

// Metodo que nos permite guardar el objeto en la DB
    await UserRepositorie.saveUser(newUser)

    const response = response201('Created', {
      detail: 'usuario creado'
    })

    return res.status(201).json(response)
  }
  catch(err){
    const response = response500('INTERNAL SERVER ERROR', {
      detail: err.message
    })

    return res.status(500).json(response)
  }

}

const verifyMailValidationTokenController = async (req, res) =>{
  try{
    const { verification_token } = req.params
    if(!verification_token){
      const response = response400('INTERNAL SERVER ERROR', {
        detail: 'Falta enviar token'
      })
      return res.json(response)
    }

    //Verificamos la firma del token, debe ser la misma que mi clave secreta. Eso asegura que este token sea emitido por mi servidor
    //Si fallara la lectura/verificacion/expiracion, hara un throw
    //La constante decoded tiene el payload de mi token
    const decoded = jwt.verify(verification_token, ENVIROMENT.JWT_SECRET)

    //Tambien podriamos verificar que el token sea el mismo que esta en la DB
    //Busco al usuario en mi DB por email
    const user = await UserRepositorie.findUserByEmail(decoded.email)

    if (user.verificationToken !== verification_token){
      const response = response400('INTERNAL SERVER ERROR', {
        detail: 'Token invalido'
      })
      return res.status(400).json(response)
      }

    if(!user){
      const response = response404('INTERNAL SERVER ERROR', {
        detail: 'Usuario no encontrado'
      })
      return res.status(404).json(response)
    }

    if(user.emailVerified){
      //logica de usuario ya validado
      const response = response201('Email ya verificado', {
        detail: 'Email ya verificado'
      })
      return res.status(201).json(response)
    }

    //En caso de pasar la validaciones, lo guardamos validado
    user.emailVerified = true
    /* user.verificationToken = undefined */

    //Guardamos el usuario
    await UserRepositorie.saveUser(user)

    const response = response200('Email verificado con exito', {
      detail: 'Usuario validado'
    })
    return res.status(200).json(response)
  }
  catch(err){
    const response = response400('INTERNAL SERVER ERROR', {
      detail: err.message
    })
    return res.status(400).json(response)
  }
}

const loginController = async (req, res) => {
  try{
    const { email, password } = req.body
    const user = await UserRepositorie.findUserByEmail(email)

    if(!user){
      const response = response404('Usuario no encontrado',{
        detail: 'El email no esta registrado'
      })
      return res.json(response)
    }

    if(!user.emailVerified){
      const response = response403('Email no verificado', {
        detail: 'Verificar el correo electronico antes de iniciar sesion'
      })
      return res.json(response)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
      const response =  response201('Credenciales incorrectas', {detail: 'Credenciales invalidas'})
      return res.json(response)
    }

    const tokenLogin = jwt.sign({
      email: user.email, 
      id: user._id, 
      role: user.role
    }, ENVIROMENT.JWT_SECRET, { expiresIn: '1d'})

    const response = response200('Login succesfull',
    {
      detail: '',
      token: tokenLogin,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
    return res.json(response)
  }
  catch(err){
    const response = response400('Internal server error', {
      detail: err.message
    })
    return res.json(response)
  }
}

const forgotPasswordController = async (req, res) =>{
  try{
    const {email} = req.body

    if(!mailValidator(email)) {
      const response = response400('Internal server error', {
        detail: 'Email invalido'
      })
      return res.status(400).json(response)
    }

    const user = await UserRepositorie.findUserByEmail(email)

    if(!user){
      const response = response404('Usuario no encontrado', {
        detail: 'El email no esta registrado'
      })
      return res.status(404).json(response)
    }

    const resetToken = jwt.sign({email: user.email}, ENVIROMENT.JWT_SECRET, {
      expiresIn: '1h'
    })

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`

    await sendEmail({
      from: "emi@s101.com.ar",
      to: email,
      subject: 'Restablecer contraseña',
      html:`
        <div>
          <h1>Has solicitado restablecer tu contraseña</h1>
          <p>Has click en el enlace de abajo para restablecer tu contraseña</p>
          <a href='${resetUrl}'>Restablecer</a>
        </div>
      `
    })

    const response = response200('Email sended', {
      detail: 'Se envio el correo con el enlace de recuperacion'
    })

    return res.status(200).json(response)
  }
  catch(err){
    console.log(err)
  }
}

const resetTokenController = async (req, res) =>{
  //logica de actualizar
  try{
    const { password } = req.body
    const { token } = req.params

    const decoded = jwt.verify(token, ENVIROMENT.JWT_SECRET)

    const user = await UserRepositorie.findUserByEmail(decoded.email)

    if(!user){
      const response = response404('Usuario no encontrado',{
        detail: 'El email no esta registrado'
      })

      return res.status(404).json(response)
    }

    if(!password){
      const response = response400('Internal server error', {
        detail: 'Password is required'
      })
      return res.status(400).json(response)
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    user.password = hashedPwd
    await UserRepositorie.saveUser(user)

    const response =  response200('Password changed', {
      detail: 'New password saved'
    })
    return res.status(200).json(response)
  }
  catch(err){
    const response = response400('Internal server error', {
      detail: err.message
    })

    return res.status(400).json(response)
  }
}

export {
  registerUserController,
  verifyMailValidationTokenController,
  loginController,
  forgotPasswordController,
  resetTokenController
}

/* const resultado = bcrypt.compareSync('1234', '$2b$10$eTbIdkCrCZYaMys2CmIiee1KNjOqBaMUm/C5Ari3apQROKced9TYm')
console.log({resultado}) */