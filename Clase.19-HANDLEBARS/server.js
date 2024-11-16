//Motores de plantilla o templates engiune
//Tambien aprendemos a configurar archivos estaticos
//HANDLEBARS

import express from 'express';
import handlebars from 'express-handlebars'
import { productArr, errors } from './helpers/productsArray.js';

const app = express()
const PORT = 5000

//Indicar a nuestro server que pueda enviar los archivos estaticos dentro de la carpeta /public
app.use(express.static('./public'))

//Middleware que nos transforma las consultas enviadas con url-encoded a objeto (BODY)
app.use(express.urlencoded({extended: true}))

//Inidicamos a nuesta app que va a utilizar un engine
//Indicamos que a los archivos con la extension handlebars deberemos tratarlos usando la libreria handlebars
app.engine('handlebars', handlebars.engine())
//Seteamos un motor de busqueda
//Cuando el servidor quiera renderizar repsuestas, lo hara usando a handlebars
app.set('view engine', 'handlebars')
app.set('views', './views')

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

app.get('/products/new', (req, res)=>{
  res.render('product-form', {
    data:{
      errors: {
        nombre: null,
        stock: null,
        precio: null,
        descripcion: null
      },
      form_state: {
        product: {
          nombre: '',
          precio: '',
          stock: '',
          descripcion: ''
        }
      }
    }
  })
})

const isSTRING = (str) => !str.trim() || !isNaN(str) 
const isNUMBER = (num) => !num.trim() || isNaN(num.trim())

app.post('/products/new', (req, res) =>{
/*   console.log(req.body)
  console.log('recibido') */
  
  for (const key in errors) {
    errors[key] = null
  }

  const {nombre, precio, descripcion, stock} = req.body
  const newProduct = {nombre, precio, descripcion, stock}


  //Si el producto se creo, redireccionar a detalles del producto, si no se pudo crear,
  //redireaccionar a una pagina de error o el formularios con los errores obtenidos

  if(isSTRING(nombre)){
    errors.nombre = 'No se puede enviar un valor vacio'
  } 
  if(isNUMBER(precio)){
    errors.precio = 'El precio debe ser un numero'
  }
  if(isNUMBER(stock)){
    errors.stock = 'El stock debe ser un numero'
  }
  if(isSTRING(descripcion)){
    errors.descripcion = 'No se puede enviar un valor vacio'
  }
  let hayError = Object.values(errors).some(err => err !== null)

  if(hayError){
    return res.render('product-form',{
      data:{
        errors: errors,
        form_state:{
          product: newProduct
        }
      }
    })
  }
  
  productArr.push({...newProduct, id: productArr.length + 1})

  res.redirect('/')
})
///////////////////////Tarea

app.get('/products/:pid/update', (req, res) =>{
  
  for (const error in errors) {
    errors[error] = null
  }

  const { pid } = req.params
  const searchedProduct = productArr.find((prod) => String(prod.id) === String(pid))
  
  if(!searchedProduct) errors.id = 'Error obteniendo el producto con el id deseado'
  
  return res.render('product-form-update', {
    data: {
      errors,
      form_state: {
        product: searchedProduct
      }
    }
  })
})


app.post('/products/:pid', (req, res) =>{
  const { pid } = req.params
  const { nombre, stock, descripcion, precio} = req.body
  const newProduct = {
    nombre,
    stock,
    precio,
    descripcion,
    id: pid
  }
  
  for ( const error in errors ){
    errors[error] = null
  }
  
  const searchedProduct= productArr.find((prod) => String(prod.id) === String(pid))
  
  //Products array shadow
  const productArrayShadow = productArr.filter(prod => String(prod.id) !== String(pid))
  
  //Validations
  if(!searchedProduct) errors.id = 'Error obteniendo el producto con el id deseado'
  if(isSTRING(nombre)) errors.nombre = 'No se puede enviar un valor vacio'
  if(isNUMBER(precio)) errors.precio = 'El precio debe ser un numero'
  if(isNUMBER(stock)) errors.stock = 'El stock debe ser un numero'
  if(isSTRING(descripcion)) errors.descripcion = 'No se puede enviar un valor vacio'
  
  let hayError = Object.values(errors).some(err => err !== null)
  
  if(hayError){
    return res.render('product-form-update', {
      ok: false,
      status: 401,
      message: 'Error en el ingreso de datos',
      data: {
        errors,
        form_state: {
          product: newProduct
        }
      }
      
    })
  }
  
  productArrayShadow.push(newProduct)
  
  return res.render('productDetail', {
    ok: true,
    status: 200,
    message: "Producto actualizado",
    data: {
      product: newProduct
    },
  })
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
      caro: productoBuscado.precio > 100,
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