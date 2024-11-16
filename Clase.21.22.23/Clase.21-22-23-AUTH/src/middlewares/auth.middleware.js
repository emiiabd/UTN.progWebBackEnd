import ENVIROMENT from "../config/enviroment.config.js"
import { ResponseBuilder } from "../utils/builders/responseBuilder.js"
import jwt from 'jsonwebtoken'


//Se invoca el veifyTokenMiddleware y recibe los roles permitidos, y luego esa funcion retorna el middleware
//Se ejecuta una vez al abrir el programa para configurar los roles permitidos, ya que la invocamos en el router
const verifyTokenMiddleware = (allowedRoles = []) =>{

  //Se ejecuta cuando se realiza la consulta
  return (req, res, next) =>{
    try{
      const auth_header = req.headers['authorization']
      if(!auth_header){
        const response = new ResponseBuilder()
          .setOK(false)
          .setStatus(401)
          .setMessage('Unauthorized')
          .setPayload({
            detail: 'Falta el token de autorizacion'
          })
          .build()
  
        return res.status(401).json(response)
      }
  
      //Bearer 'asdfsdjkfhdsjghkd' => ['Bearer', 'asdfsdjkfhdsjghkd'] => arr[1]
      // de un array, te genera un array guardando un valor en cada elemento cuando hay un espacio, y esta funcion te devuelve el segundo valor
      const access_token = auth_header.split(' ')[1]
      if(!access_token){
        const response = new ResponseBuilder()
          .setOK(false)
          .setStatus(401)
          .setMessage('Token invalido')
          .setPayload({
            detail: 'El token de autorizacion esta malformado'
          })
          .build()
  
        return res.status(401).json(response)
      }
  
      const decoded = jwt.verify(access_token, ENVIROMENT.JWT_SECRET)
  
      req.user = decoded //Guardamos en la request la informacion del usuario

      if(allowedRoles.length && !allowedRoles.includes(req.user.role)){
        const response = new ResponseBuilder()
        .setOK(false)
        .setMessage('Acceco restringido')
        .setStatus(403)
        .setPayload({
          detail: 'No tiene permisos necesarios para realizar esta operacion'
        })
        .build()

      return res.status(403).json(response)
      }
  
      return next() //pasamos al siguiente controlador
    }
    catch(err){
      const response = new ResponseBuilder()
        .setOK(false)
        .setMessage('Fallo al autentificar')
        .setStatus(500)
        .setPayload({
          detail: err.message
        })
        .build()
      return res.status(500).json(response)
    }
  }
  
}

const verifyApiKeyMiddleware = (req, res, next) =>{
  try{
    const apikey_header = req.headers['x-api-key']
    if(!apikey_header){
      const response = new ResponseBuilder()
        .setOK(false)
        .setStatus(401)
        .setMessage('Unauthorized')
        .setPayload({
          detail: 'Falta el api-key de autorizacion'
        })
        .build()

      return res.status(401).json(response)
    }

    if(apikey_header !== ENVIROMENT.API_KEY_INTERN){
      const response = new ResponseBuilder()
        .setOK(false)
        .setStatus(401)
        .setMessage('Unauthorized')
        .setPayload({
          detail: 'Api-key es invalida'
        })
        .build()

      return res.status(401).json(response)
    }
    return next()
  }
  catch(err){
    const response = new ResponseBuilder()
      .setOK(false)
      .setMessage('Internal server error')
      .setStatus(500)
      .setPayload({
        detail: 'No se pudo validar la api-key'
      })
      .build()
    return res.status(500).json(response)
  }
}

export {
  verifyTokenMiddleware,
  verifyApiKeyMiddleware,
}