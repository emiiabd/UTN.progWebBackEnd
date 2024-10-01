import express from 'express'
import productRouter from './routes/products.routes.js';

const app = express();
const PORT = 3000;

//middleware para que nuestra app sea compatible con recibir json en el body
app.use(express.json())

//endpoint de prueba del servidor
app.get('/ping', (req, res) =>{
  res.json({
    ok: true,
    status: 200,
    payload: {
      message: 'pong'
    }
  })
})

/* 
Armar un endpoint /ping que reciba un objeto que tenga message y mostrarlo por consola
Responder: 
{
    ok: true,
    status: 200,
    payload: {
      message: 'ping resibido'
    }
  }
*/

app.post('/ping', (req, res) => {
  console.log(req.body)
  res.json({
    ok: true,
    status: 200,
    payload: {
      message: 'Ping Recibido'
    }
  })
})

/* 
  Query strings,

  /api/products?limit=5&precio_minimo=200

*/
app.use('/api/products', productRouter)

app.listen(PORT, ()=>{
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})