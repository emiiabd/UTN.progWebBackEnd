import ENVIROMENT from "../config/enviroment.config.js"
import USER from "../models/user.model.js"
import { ResponseBuilder } from "../utils/builders/responseBuilder.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUserController = async (req, res) =>{
  try{
    const { name, email, password } = req.body

    const userExist = await USER.findOne({email: email})
    if(userExist){
      const response = new ResponseBuilder()
        .setOK(false)
        .setStatus(400)
        .setMessage('Bad Request')
        .setPayload({
          detail: 'Email in use'
        })
        .build()

      res.status(400).json(response)
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

    const newUser = new USER(
      {
        name,
        email,
        password: hashedPwd,
        verificationToken: verificationToken,
        emailVerified: false
      }
    )

    await newUser.save()

    const response = new ResponseBuilder()
    .setOK(true)
    .setStatus(200)
    .setMessage('Created')
    .setPayload(
      {
        detail: "usuario creado"
      }
    )
    .build()

    return res.status(201).json(response)
  }
  catch(err){
    const response = new ResponseBuilder()
    .setOK(false)
    .setStatus(500)
    .setMessage('Internal Server Error')
    .setPayload(
      {
        detail: err.message
      }
    )
    .build()


    return res.status(500).json(response)
  }

}

/* const resultado = bcrypt.compareSync('1234', '$2b$10$eTbIdkCrCZYaMys2CmIiee1KNjOqBaMUm/C5Ari3apQROKced9TYm')
console.log({resultado}) */