//Hoy lo planteamos de la forma correcta

import DB_POOL from "../db/configMySQL.js";
import Product from "../models/product.model.js";


// MONGO REPOSITORY
/* class ProductRepository{
  static async getProducts(){
    //Para obtener la lista de productos activos
    return Product.find({active: true})
  }

  static async getProductById(id){
    return Product.findById(id)
  }
  
  static async getProductBySellerId(id){
    return Product.find({seller_id: id})
  }

  static async createProduct(product_data){
    const newProduct = new Product(product_data)
    return newProduct.save() //para guardar los datos (el nuevo producto en la db)
  }

  static async udpateProduct(id, new_product_data){//    Con esto nos trae el resultado (Nos devuelve el producto actualizado)
    return Product.findByIdAndUpdate(id, new_product_data, {active: true}, {new: true})
  }

  static async deleteProduct(id){
    return Product.findByIdAndUpdate(id, {active: false}, {new: true})
  }
}

*/

// MYSQL REPOSITORY

/* 
CREATE TABLE products (
	id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  imageBase64 LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  seller_id INT,
  );
  */

class ProductRepository {
  static async getProducts() {
    //Seleccionar todos los productos que esten activos
    //SELECT * FROM products WHERE active = true
    const query = 'SELECT * FROM products WHERE active = true'
    //Esto devuelve un array con 2 valores
    //el primer valor es el resultado o las rows / filas / registros
    //el segundo valor son las columnas que tiene esta tablas (como el "modelo")
      //registros, columnas
    const [rows, columns] = await DB_POOL.execute(query) 

    // REGISTROS console.log(rows)
    return rows
}

static async getProductBySellerId(seller_id) {
  const query = `SELECT * FROM products WHERE seller_id = ?`
  const [rows, columns] = await DB_POOL.execute(query, [seller_id])
  return true
}

//Si queremos devolver null cuando no se enecuentre
static async getProductById (product_id) {
  //Para evitar injeccion sql se coloca el ?
  const query = `SELECT * FROM products WHERE id = ?`
  //Execute espera como segundo parametro un array con los valores que quieras reemplazar en la query
  const [rows, columns] = await DB_POOL.execute(query, [product_id])
  return rows.length > 0 ? rows[0] : null
}

static async createProduct (data) {
  const query = `INSERT INTO products 
  (title, stock, price, description, category, seller_id,imageBase64, active) 
  VALUES
  (?, ?, ?, ?, ?, ?, ?, true)`

  console.log(data)
  const [rows, columns] = await DB_POOL.execute(
    query, 
    [data.title, data.stock, data.price, data.description, data.category, data.seller_id, data.imageBase64]
  )

  return {
    id: rows.insertId,
    title: data.title, 
    stock: data.stock,
    price: data.price,
    description: data.description,
    category: data.category,
    seller_id: data.seller_id,
    imageBase64: data.imageBase64
  }
}
}

export default ProductRepository 