import { leerJson } from "./jsonManager.utils.js"
import { responseBuilder } from "./builders.utils.js"

const CATEGORIES = ['ropa', 'electrodomestico', 'jugeteria']
const PROPIETIES = ['title', 'price', 'category', 'stock', 'id']

const stringValidation = (text) => text && typeof(text) === 'string'
const numberValidation = (num) =>  !isNaN(num) && num >= 0

class productManager{

  constructor(){
    this.response = {
      title: '',
      price: 0,
      category: '',
      stock: 0,
      id: '',
      STATUS: 200,
      ERROR: []
    }
  }
  
  setTitle(title){
    try{
      if(!stringValidation(title)) throw {message: ' Titulo inexistente o invalido'}
      this.response.title = title
    }
    catch(error){
      this.response.STATUS = 400
      this.response.ERROR.push(error.message)
    }
    return this
  }
  
  setPrice(price){
    try{
      if(!numberValidation(price)) throw {message: ' Precio inexistente, invalido o negativo'}
      this.response.price = price
    }
    catch(error){
      this.response.STATUS = 400
      this.response.ERROR.push(error.message)
    }
    return this
  }
  
  setCategory(cat){
    try{
      if(!stringValidation(cat)) throw {message: ' Categoria invalida'}
      if(!CATEGORIES.includes(cat)) throw {message: ' Categoria inexistente'}
      this.response.category = cat
    }
    catch(error){
      this.response.STATUS = 400
      this.response.ERROR.push(error.message)
    }
    return this
  }
  
  setStock(num){
    try{
      if(!numberValidation(num)) throw {message: ' Stock inexistente, invalido o negativo'}
      this.response.stock = num
    }
    catch(error){
      this.response.STATUS = 400
      this.response.ERROR.push(error.message)
    }
    return this
  }
  
  build(){
    return this.response
  }
}

const productsValidations = async (product) =>{
  const invalidPROPIETIES = []
  const productList = await leerJson()
  
  const productObj = new productManager()
    .setTitle(product.title)
    .setPrice(product.price)
    .setCategory(product.category)
    .setStock(product.stock)
    .build()
  
  for(let prop in product){
    if(!PROPIETIES.includes(prop)){
      invalidPROPIETIES.push(prop)
    }
  }

  for(let prod in productList){
    if(product.title && productList[prod].title === product.title.toLowerCase()){
      invalidPROPIETIES.push(' Ya existe un producto con el mismo nombre' )
    }
  }
  
  if(productObj.STATUS === 400 || invalidPROPIETIES.length > 0){
    const response = new responseBuilder()
    .setOk(false)
    .setStatus(productObj.STATUS)
    .setPayload({
      message: `Propiedades invalidas:${invalidPROPIETIES},${productObj.ERROR}`
    })
    .build()
    
    return response
  }
  else{
    return productObj
  }

}

export { productsValidations }