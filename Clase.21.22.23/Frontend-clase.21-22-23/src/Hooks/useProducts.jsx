import { useEffect, useState } from "react"
import { GET } from "../fetching/http.fetching"

const useProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  const getProducts = async () => {
    const response = await GET('/api/products')
    if(response.ok) {
      setProducts(response.payload.products)
      setIsLoadingProducts(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  //Se retorna un objeto
  return {products, isLoadingProducts}
}

export default useProducts