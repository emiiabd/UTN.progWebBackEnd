//EXPRESS
//Se actualizo hace poquito
//Permite crear APIS

//Se ejecuta en la pc y nos permite conectar y manejar logica de negocio

import express, { response } from 'express'
import filesystem from 'fs'
import { request } from 'http'
import { validarEmail, validarNombre } from './constants/validations.js'

const app = express()

//Middleware que nos habilida a recibir consultas con url encoded
app.use(express.urlencoded({extended: true}))

app.get('/', (request, response) => {
  response.send('hola')
})

//Get se utiliza para obtener alguna informacion
app.get('/fecha', (request, response) => {
  response.send(new Date().toString())
})

//Post se utiliza para enviar algun dato, formulario, etc
/* app.post('/usuario', (request, response) => {
  //request, son los datos de la consulta en forma de objeto
  //request.body es la carga util recibida (los datos recibidos)
  console.log(request.body)
  const usuarios = JSON.parse(filesystem.readFileSync('./usuarios.json', 'utf-8'))
  usuarios.push({nombre: request.body.nombre, email: request.body.email})
  filesystem.writeFileSync('./usuarios.json', JSON.stringify(usuarios), 'utf-8')
  response.send('Usuario registrado')
}) */

app.listen(3000, () => console.log('Aplicacion ejecutandose en http://localhost:3000'))


/* 
POST usuario

camos a verificar que valores hay en ./usuarios.json
Si la respuesta es null crearemos un array y agremamos el usuario recibido. 

Si la respuesta es distinta de falsy:
Vamos a transformar la respuesta a Objeto de JS y agregaremos al usuario recibido

Finalmente os guardaremos en el archivo usuarios.json

2.
Validar que la consulta este correcta, es decir que reciba nombre y email
en caso de no recibir deberemos responder con el detalle del error

Ej:
{nombre:''} => Falta ingresar nombre

Aplicar try catch sobre el codigo, si alguna operracion como readFile, writeFile, JSON.parce o JSON.stringify falla, 
deemos capoturar el fallo en catch, mostrar dicho fallo por consola dfe error y responder con un 'Fallo interno en el servidor'
*/

app.post('/usuario', async (request, response) => {
  const userPost = {nombre: request.body.nombre, email: request.body.email}
  let users
  
  try{
    const resultado = await filesystem.promises.readFile('./usuarios.json', 'utf-8')
    if(!validarNombre(userPost.nombre)) throw {data: 'Error en el nombre'}
    if(!validarEmail(userPost.email)) throw {data: 'Error en el email'}
    
    if(!resultado){
      users = [userPost]
    }
    else{
      users = JSON.parse(resultado)
      users.push(userPost)
    }

    await filesystem.promises.writeFile('./usuarios.json', JSON.stringify(users), 'utf-8')
    response.send('Usuario registrado')
  }
  catch(error){
    if(error.data){
      response.send(error.data)
    }else{
      console.error('Fallo interno en el servidor: \n', error)
      response.send('Fallo interno en el servidor')
    }
  }
})