//Donde voy a tener todas las configuracions del servidor, es decir API. No son lo mismo server que api

//npm install express
//Importamos
import express, { response } from 'express'
import { request } from 'http';
import userRouter from './routes/user.router.js';

//iniciamos/creamos la aplicacion express que se guarda en la constante app. Es la ejecucion de la funcion express()
const app = express();
const PORT = 3000;

//Configuramos para que nuestra app pueda recibir json
//MIDDLEWARE es una aplicacion (funcion) que se ejecuta entre medio de una consulta
//Entre el medio de la consulta del usuario y el servidor, se ejecutan los middleware

//MIDDLEWARE para poder recibir json en el body
app.use(express.json()) //Se utiliza mas para la comunicacion entre el back y el front

//MIDDLEWARE para poder recibir informacion de tipo x-www-urlencoded
//detecta cuando la consulta esta en formato urlencoded y la transforma a objeto de javascript
app.use(express.urlencoded({extended: true}))

app.get('/ping', (request, response) =>{
  response.send('pong')
})

app.post('/enviar', (request, response) =>{
  console.log(request.body);
  response.send('Recibido')
})

//Rutas
//Ruta que se ve a encarga de todo lo referido a los usuarios
//Registramos la ruta /api/users y delegamos las consultas recibidas a esta ruta al userRouter
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log('Servidor activo. http://localhost:' + PORT)
})
