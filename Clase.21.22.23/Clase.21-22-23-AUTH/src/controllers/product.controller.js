
/* 
Crear el schema en mondo db
Desarrollar cada controlador

-Que voy a recibir
- getallprocuts: no recibo nada


-Que voy a responder en caso perfecto
- detallproducts: devuelve la lista de productos activa
*/

import mongoose from "mongoose";
import ProductRepository from "../repositories/product.repository.js";
import { ResponseBuilder } from "../utils/builders/responseBuilder.js";
import { response200, response201, response400, response404, response500 } from "../utils/responses.util.js";
import { validateDuplicateProduct } from "../utils/product.util.js";

/* //FORMA REAL DE TRABAJAR EN GRUPO (FIRMA CON EL FRONTEND, me comprometo a crear este enpoint)


ENDPOINT: /api/products
METHOD: GET

headers:
  - x-api-key
  - Autorization

response:{
  ok: true,
  status: 200,
  message: productos objtenidos,
  payload: {
    products: [
      {
        title,
        price,
        stock,
        description,
        category,
        _id:,
        active,
        create_at
      }
    ]
  }

}
*/

const getAllProductsController = async (req, res) => {
  try {
    const products = await ProductRepository.getProducts()

    if(!products) throw {
      message: "Error al obtener los productos",
      error: error
    }

    const response = response200('Productos obtenidos', {
      products
    })
    return res.status(200).json(response)
  } 
  catch (error) {
    const response = response500('Internal Server Error', {
      error: error
    })
    return res.status(500).json(response)
  }    
};

/* 
REcibo:

params: id (el id del producto)

Devuelvo:

prodcut: product (el producto encontrado)
*/
const getProductByIdController = async (req, res) => {
  //Hacer las validaciones de tare
  try {
    const {product_id} = req.params

    if (!product_id) {
        const response = response400('Internal Server Error', {
            detail: 'Id invalido'
        })
        return res.status(400).json(response)
    }

    const product = await ProductRepository.getProductById(product_id)

    if(!product){
      const response = response404('Internal Server Error', {
        detail: 'Producto no encontrado'
      })
      return res.status(404).json(response)
    }

    const response = response200("Product found", {
      product: product
    })
    return res.status(200).json(response)
  } 
  catch (error) {
    const response = response500("Internal Server Error", {
      error: error.message
    })
    return res.status(500).json(response)
  }
}

/* 
RECIBO:

body: title, price, stock, description, category, image

DEVUELVO:

product: product
*/

const createProductController = async (req, res) => {
  try {
    const { title, price, stock, description, category, image } = req.body
    const seller_id = req.user.id
    const newProduct = {
      title,
      price,
      stock,
      description,
      category,
      imageBase64: image,
      seller_id
    }

    for(let value in newProduct){
      if(!newProduct[value]){
        const response = response404("Internal Server Error",{
          detail: `${value} field is invalid or null`
          
        })
        return res.status(404).json(response)
      }
    }
    
    if(image && Buffer.byteLength(image, 'base64') > 2 * 1024 * 1024) throw 'La imagen excede el tamaño permitido'

    //if(!await validateDuplicateProduct(title, seller_id)) throw 'El producto ya existe'
    
    if (isNaN(price) || price < 1) {
        const response = response400('Internal Server Error', {
            detail: 'Precio invalido o 0'
        })
        return res.status(400).json(response)
    }
    if (isNaN(stock) || stock < 1) {
        const response = response400('Internal Server Error', {
            detail: 'stock invalido o 0'
        })
        return res.status(400).json(response)
    }

    await ProductRepository.createProduct(newProduct)

    const response = response200('Product Created', {
        data: newProduct
    })
    return res.status(200).json(response)
  }
  catch (error) {
    
    const response = response500('Internal Server Error', {
      error: error
    })
    return res.status(500).json(response)
  }
};
/* 
RECIBO:

body: title, price, stock, description, category, image req.body
user_id req.user.id

DEVUELVO:

product: product

*/

const updateProductController = async (req, res) => {
  try {
    const { title, price, stock, description, category, image } = req.body
    const { product_id } = req.params
    const seller_id = req.user.id

    const newProduct = {
      title,
      price,
      stock,
      description,
      category,
      imageBase64: Buffer.from(image, 'base64'),
      seller_id,
      active: true
    }

    const errorArray = []

    for(let value in newProduct){
      if(!newProduct[value]){
        errorArray.push(value)
      }
    }

    if(errorArray.length > 0) throw `${errorArray.join(', ')} es invalido o nulo`

    if (isNaN(price) || price < 1) throw 'precio invalido o 0'

    if (isNaN(stock) || stock < 1) throw 'stock invalido o 0'
    
    console.log(Buffer.byteLength(image, 'base64'))
    if(newProduct.imageBase64 && Buffer.byteLength(image, 'base64') > 2 * 1024 * 1024) throw 'La imagen es demasiado grande (Max. 2MB)'
    
    const product = await ProductRepository.getProductById(product_id)

    if(!product || !product_id) throw 'Id de producto invalido' 

    if(product.seller_id.toString() !== seller_id) throw 'No eres el vendedor del producto'  


    if(product.active){
      if(!await validateDuplicateProduct(title, seller_id)) throw 'Ya existe un producto con el mismo nombre'
    }

    const newProductUpdated = await ProductRepository.udpateProduct(product_id, newProduct)

    if(!newProductUpdated) throw {
      message: 'No se pudo actualizar el producto',
      error: error
    }
    
    const response = response200('Product Updated', {
        data: newProduct
    })
    return res.status(200).json(response)
  } 
  catch (error) {
    const response = response500('Internal Server Error', {
      detail: error
    })
    return res.status(500).json(response)
  }
};

/* 
RECIBIMOS:
product_id: req.params.product_id
user_id: req.user.id

DEVUELVO:
producto eliminado con exito
*/

const deleteProductController = async (req, res) => {
  try {
    const { product_id } = req.params
    const seller_id = req.user.id
    
    const product = await ProductRepository.getProductById(product_id)
    
    if(!product || !product_id) throw 'Id de producto invalido'
    
    if(product.seller_id.toString() !== seller_id) throw 'No eres el vendedor del producto'
    
    if(!product.active) throw 'El producto ya esta deshabilitado'
    
    const newProductUpdated = await ProductRepository.deleteProduct(product_id)

    if(!newProductUpdated) throw {
      message: 'No se pudo actualizar el producto',
      error: error
    }

    const response = response201("Producto Deshabilitado", newProductUpdated)
    return res.status(201).json(response)
  } 
  catch (error) {
    const response = response500('Internal Server Error', {
      detail: error
    })
    return res.status(500).json(response)
  }
};

export {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
}