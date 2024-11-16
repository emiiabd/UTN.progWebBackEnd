//Motores de plantilla o templates engiune
//Tambien aprendemos a configurar archivos estaticos
//HANDLEBARS

import express from 'express';
import { engine } from 'express-handlebars'

const app = express()
const PORT = 5000

//Indicar a nuestro server que pueda enviar los archivos estaticos dentro de la carpeta /public
app.use(express.static('./public'))

//Inidicamos a nuesta app que va a utilizar un engine
//Indicamos que a los archivos con la extension handlebars deberemos tratarlos usando la libreria handlebars
app.engine('handlebars', engine())
//Seteamos un motor de busqueda
//Cuando el servidor quiera renderizar repsuestas, lo hara usando a handlebars
app.set('view engine', 'handlebars')
app.set('views', './views')

const productArr=[
  { 
    id: 1,
    nombre: 'Tv samsung',
    precio: '100',
    descripcion: 'Tv de 85 pulgadas'
  },
  { 
    id: 2,
    nombre: 'Tv LG',
    precio: '150',
    descripcion: 'Tv home con internet'
  },
  { 
    id: 3,
    nombre: 'Tv Noblex',
    precio: '200',
    descripcion: 'Tv grande'
  }
]

app.get('/', (req, res) => {

  try{
    
    
    /* throw new Error('Error de prueba') */
    const response = {
      ok: true,
      status: 200,
      data: {titulo: 'Titulo X', fecha: '3/10/2024', valorDolar: 1230, productArr},
      message: "Productos obtenidos",
      layout: 'products' //Esto te permite renderizar otro layout, simplemente hay que agregar esta propiedad en la respuesta
    }
  
    //A esto le podemos enviar datos a nuestra plantilla
    res.render('home', response)
  }
  catch(err){
    console.log(err)
    const response = {
      ok: false,
      status: 500,
      data: {
        detail: err.message
      },
      message: "Error al obtener los productos"
    }
    res.render('home', response)
  }

})

app.get('/products/:pid', (req, res) =>{
  const { pid } = req.params
  //Aca se podria validar el product id
  const productoBuscado= productArr.find((prod) => prod.id == pid)
  console.log(productoBuscado)

  const response = {
    ok: true,
    status: 200,
    data: {
      product: productoBuscado
    },
    message: "Producto obtenido",
    layout: 'main' //Esto te permite renderizar otro layout, simplemente hay que agregar esta propiedad en la respuesta
  }

  res.render('productDetail', response)
})
app.listen(PORT, () => {
  console.log(
    `La aplicacion se esta ejecutando en http://localhost:${PORT}`
  )
})

/* 
Para la clase que vieneÑ JSON web token
usuarios 
resgistros
login
Aprendemos a hacer hashes
mas middleware
*/