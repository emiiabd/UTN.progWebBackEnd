import React from 'react'
import { Link } from 'react-router-dom'
import { GET } from '../../fetching/http.fetching'
import useProducts from '../../Hooks/useProducts'



const Home = () => {

  const user_info = JSON.parse(sessionStorage.getItem('user_info'))
  
  const { products, isLoadingProducts } = useProducts()

  console.log(products)

  return (
    <div>
      <p>Bienvenido {user_info.name}</p>
      <Link to='/createProduct'>Crear producto</Link>
      <br />
      {
        isLoadingProducts 
        ? <span>Cargando ...</span>
        : <ProductsList products={products} />
      }
    </div>
  )
}

const ProductsList = ({products}) => {
  return (
    products.map(product => <Product key={product.id} {...product} />)
  )
}

const Product = ({title, price, stock, description, imageBase64, id}) => {


  if(title == 'messi'){
    console.log(typeof(imageBase64))
  }

  
  return (
    <div>
      <h1>{title}</h1>
      <p>{price}</p>
      <p>{stock}</p>
      <p>{description}</p>
      <img src={imageBase64} alt={title} width={'200'} />
      <Link to={`/product/${id}`}>Ver Detalle</Link>
    </div>
  )
}
export default Home