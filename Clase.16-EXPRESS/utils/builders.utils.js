import {v4 as uuid} from 'uuid';

/* Response{
  ok: true,
  status: 200,
  payload: {
    product: [Lista de productos]
  }
} 

{
    "title": "Product 1",
    "price": 100,
    "id": 1,
    "category": "Category 1",
    "stock": 10
  }

*/
class responseBuilder {
  constructor(){
    this.response = {
      ok: false,
      status: 400,
      payload: {
        message: 'ERROR'
      }
    }
  }

  setOk(ok){
    this.response.ok = ok
    return this
  }

  setStatus(status){
    this.response.status = status
    return this
  }

  setPayload(payload){
    this.response.payload = payload
    return this
  }

  build(){
    return this.response
  }
}


class productBuilder {

  constructor(){
    this.response = {
      title: '',
      price: 0,
      id: uuid(),
      category: '',
      stock: 0
    }
  }

  setTitle(title){
    this.response.title = title
    return this
  }

  setId(id = uuid()){
    this.response.id = id
    return this
  }

  setPrice(price){
    this.response.price = price
    return this
  }

  setCategory(category){
    this.response.category = category
    return this
  }

  setStock(stock){
    this.response.stock = stock
    return this
  }

  build(){
    return this.response
  }
}

const notFoundProductResponse = new responseBuilder()
  .setOk(false)
  .setStatus(404)
  .setPayload({message: "Producto no encontrado"})
  .build()

const JSONerrorResponse = new responseBuilder()
  .setOk(false)
  .setStatus(500)
  .setPayload({message: "Error en lectura de archivo"})
  .build()

export { responseBuilder, productBuilder, notFoundProductResponse, JSONerrorResponse }