//Los archivos repository son los que tendran la responsabilidad de interactuar con los datos de la base de datos
//EJEMPLOS:
/* 
getProductById() que va a buscar el producto por id desde la base de datos (mongo, sql, etc)

Ventajas:

- Poner una capa logica sobre la obtencion de datos separada de la logica de negocio
Si el dia de ma;ana por X motivo nos cambian la base de datos, solo debemos modificar la cama logica repository

*/

import { leerJson } from "../utils/jsonManager.js"

const getUserByName = async (name) =>{
  try{
    const users = await leerJson('usuarios')
    const usuario = users.find(user => user.nombre === name)
    return usuario
  }
  catch(error){
    console.error(error)
  }
} 

export { getUserByName }