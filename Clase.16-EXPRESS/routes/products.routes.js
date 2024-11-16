import express from 'express';
import { crearJson, leerJson } from '../utils/jsonManager.utils.js'
import { JSONerrorResponse, notFoundProductResponse, productBuilder, responseBuilder } from '../utils/builders.utils.js'
import { productsValidations } from '../utils/productsValidations.utils.js';

const productRouter = express.Router()

/* productRouter.get('/detail/:lang/:product_id', (req, res) =>{
  const {resumen} = req.query
  const {product_id, lang} = req.params

  if(resumen === 'true'){
    console.log(resumen)
    res.json({
      message: 'Funciona'
    })
    return
  }
  if(lang === 'ES'){
    
    
    res.json({
      ok: true,
      status: 200,
      payload : {
        message: 'Detalles del producto ' + product_id
      }
    })
  }
  else if(lang === 'EN'){
    res.json({
      ok: true,
      status: 200,
      payload : {
        message: 'Details products ' + product_id
      }
    })
  }
  }) */
//Traer detalles del producto con id 1
//http:/localhost:3000/api/products/detail/1



//Traer todos los productos
productRouter.get('/', async (req, res) =>{
  
  try{
    const products = await leerJson()
    
    const response = new responseBuilder()
      .setOk(true)
      .setStatus(200)
      .setPayload({products})
      .build()
    
    res.json(response)
  }
  catch(error){
    res.json(JSONerrorResponse)
  }
})

//Crear un producto
productRouter.post('/', async (req, res) =>{
  const newProductObj = await productsValidations(req.body)

  try{
    const productsArray = await leerJson();
    
    if(newProductObj.ok == false ){
      res.json(newProductObj)
    }
    else{
      const product = new productBuilder()
        .setTitle(newProductObj.title)
        .setPrice(newProductObj.price)
        .setCategory(newProductObj.category)
        .setStock(newProductObj.stock)
        .setId()
        .build()
      
      productsArray.push(product)
      
      await crearJson(productsArray)
      
      const response = new responseBuilder()
        .setOk(true)
        .setStatus(200)
        .setPayload({products: productsArray})
        .build()
      
      res.json(response)
    }
  }
  catch(error){
    res.json(JSONerrorResponse)
  }
})

//Traer detalles del producto con un id con parametro de busqueda
productRouter.get('/:pid', async (req, res) =>{
  const { pid } = req.params
  
  try{
    const productsArray = await leerJson()
    const findProduct = productsArray.find((products) => String(products.id) === String(pid))
    
    if(!findProduct){
      res.json(notFoundProductResponse)
    }
    else{
      const response = new responseBuilder()
        .setOk(true)
        .setStatus(200)
        .setPayload({findProduct})
        .build()
      
      res.json(response)
    }
  }
  catch(error){
    res.json(JSONerrorResponse)
  }
})

//Actualizar producto por id
productRouter.put('/:pid', async (req, res) =>{
  const { pid } = req.params

  try{
    const newProductObj = await productsValidations(req.body)
    const productsArray = await leerJson()
    const findProduct = productsArray.find((products) => String(products.id) === String(pid))
    
    if(!findProduct || newProductObj.ok == false ){
      if(!findProduct){
        res.json(notFoundProductResponse)
      }
      else{
        res.json(newProductObj)
      }
    }
    else{
      const shadowProducts = productsArray.filter((products) => String(products.id) !== String(pid))
      const product = new productBuilder()
        .setTitle(newProductObj.title)
        .setPrice(newProductObj.price)
        .setCategory(newProductObj.category)
        .setStock(newProductObj.stock)
        .setId(pid)
        .build()
      
      shadowProducts.push(product)

      await crearJson(shadowProducts)
      
      const response = new responseBuilder()
        .setOk(true)
        .setStatus(200)
        .setPayload(shadowProducts)
      
      res.json(response)
    }
  }
  catch(error){
    res.json(JSONerrorResponse)
  }
})

//Eliminar producto por id
productRouter.delete('/:pid', async (req, res) =>{
  const { pid } = req.params
  
  try{
    const productsArray = await leerJson()
    const newProductsArray = productsArray.filter((product) => String(product.id) !== String(pid))

    if(newProductsArray.length === productsArray.length){
      res.json(notFoundProductResponse)
    }
    else{
      await crearJson(newProductsArray)
      
      const response = new responseBuilder()
        .setOk(true)
        .setStatus(200)
        .setPayload('Producto eliminado')
      
      res.json(response)
    }
  }
  catch(error){
    res.json(JSONerrorResponse)
  }
})


export default productRouter