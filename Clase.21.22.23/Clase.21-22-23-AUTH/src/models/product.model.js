import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  imageBase64:{
    type: String
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId, 
    //Debe ser le mismo tipo que el id de la coleccion de User, esto es una referencia como la foreing key
    ref: 'User',
    //Le referenciamos la tabla, en este caso User, se debellamar igual que en el modelo. Pero en la db mongoose lo colocar en plural (una especio de inteligencia artificial)
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now()
  }
})

const Product = mongoose.model('Product', productSchema) //creamos el modelo y se utiliza con Product (como una clase)

export default Product