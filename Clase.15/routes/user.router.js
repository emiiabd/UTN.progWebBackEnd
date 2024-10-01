import express from 'express';
import ResponseBuilder from '../utils/responseBuilder.util.js';
import { getUserByName } from '../repositories/user.repository.js';

const userRouter = express.Router()

//Si queres usar un PARAMETRO DE BUSQUEDA, SIEMPRE debe ir arriba de todo
/* nombre: user id, se puede poner cualquier nombre, pero representa con los dos puntos un parametro de busqueda */
userRouter.get('/:nombre', async (req, res) => {
  console.log(req.params.nombre)
  const nombre = req.params.nombre
  const user = await getUserByName(nombre)


  res.send(user)
})


userRouter.get("/", (request, response) => {
  let res = new ResponseBuilder()
  .setOk(true)
  .setPayload({
    mensaje: 'datos del usuario'
  })
  .setCode(ResponseBuilder.CODES.GET_INFO_SUCCESS)
  .setStatus(200)
  .build()

  response.json(res)
  /* response.status(404).send('No se encontro el usuario') */
})

userRouter.get('/cantidad', (request, response) =>{
  let res = new ResponseBuilder()
  .setOk(true)
  .setPayload({
    cantidad: 9
  })
  .setStatus(200)
  .setCode(ResponseBuilder.CODES.GET_INFO_SUCCESS)
  .build()
  //para enviar un json
  response.json(res)
})


//delete ResponseBuilder.CODES.GET_INFO_SUCCESS

/* console.log(ResponseBuilder.valor) */
/* console.log(ResponseBuilder.CODES.GET_INFO_SUCCESS) */

/* 
Estructuras tipicas de respuesta:

{
  ok: boolean,
  payload | data: {objeto con informacion},
  code: string | number,
  status: estatusHTTP
}

{
  ok: boolean,
  payload | data: {objeto con informacion},
  code: string | number,
  status: estatusHTTP
  message: string suele decir mensajes del error en particular
}

  // en caso de error
{
  ok: boolean,
  error: {objeto con informacion},
  code: string | number,
  status: estatusHTTP
  message: string suele decir mensajes del error en particular
}

{
  ok: boolean,
  payload | data: {objeto con informacion},
}
*/

/* let response = fetch()
if(respuesta.ok){
  //caso verdadero
}else{
  //caso incorrecto
} */
export default userRouter