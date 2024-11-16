import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useDetailProducts from '../../Hooks/useDetailProduct'

const DetailProductScreen = () => {

  const {id} = useParams()

  //llamar al hook userProductDetail

  const { product } = useDetailProducts(id)

  return (
    <div>DetailProductScreen 
      <br />
      {product.title}
      <br />
      {product.price}
      <br />
      {product.stock}
      <br />
      {product.description}
      <br />
      <img src={product.imageBase64} width={'200'} alt="" />
      <br />
      <Link to={`/home`}>Home</Link>
    </div>
  )
}

export default DetailProductScreen