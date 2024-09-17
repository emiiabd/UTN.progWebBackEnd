import { mongoose } from "./config/mongoDB.config.js";
import { crearUsuario, buscarUsuarioPorId, actualizarUsuarioPorId } from "./manager/user.manager.js";


//En vez de hacer esto cuando utilizar await fuera de tu scope
//console.log(await buscarUsuarioPorId('66e97b0f85f859faafb79120'))

/*
//Es mejor hacer esto:
//Solo conviene .then .catch si no se deben hacer multiples operaciones asincronicas, sino podemos caer en el callbackhell
//Callback Hell Ejemplo: https://blog.avenuecode.com/hubfs/Screen%20Shot%202019-01-09%20at%202.28.27%20PM.png

buscarUsuarioPorId('66e97b0f85f859faafb79120')
//el .then y el .catch son metodos de promesa

.then(
  (retorno) => {
    console.log(retorno)
  }
) 
//.then se ejecuta cuando la funcion, promesa se resolvio correctamente, captura el resultado y se la pasa a la callback
.catch( 
  (error) =>{
    console.log('Ocurrio una excepcion', error)
  }
) 
//.catch se ejecuta cuando la funcion, promesa devuelve un throw (ocurre un error o no puede retornar)
.finally(
  () => console.warn('Proceso finalizado')
) 
//.finally es un metodo de promesa que se ejecuta al finalizar la promesa independientemente del resultado de la misma 
*/

/* actualizarUsuarioPorId('66e97b0f85f859faafb79120', {email: 'asdasd@example.com'}) */