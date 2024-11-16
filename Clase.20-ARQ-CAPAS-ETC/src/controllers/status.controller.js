import { ResponseBuilder } from "../utils/builders/responseBuilder.js";


/* 
Capa de controlador tienela responsabilidad de recibir datos, validarlos y responder

*/

const getPingController = (req, res) =>{
  
  try{
    const response = new ResponseBuilder()
    .setOK(true)
    .setMessage('Success')
    .setStatus(200)
    .setPayload({
      message: 'pong'
    })
    .build()
  
  res.status(200).json(response)
  }
  catch(err){
    const response = new ResponseBuilder()
    .setOK(false)
    .setMessage('Internal server error')
    .setStatus(500)
    .setPayload({
      message: err.message
    })
    .build()
  
  res.status(500).json(response)
  }
  
}

export {
  getPingController
}