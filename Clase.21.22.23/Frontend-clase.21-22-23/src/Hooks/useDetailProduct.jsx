import { useEffect, useState } from "react"
import { GET } from "../fetching/http.fetching"


const useDetailProducts = (id) => {
  const [product, setProduct] = useState({})

  try {

    const getProductById = async () => {
      const response = await GET(`/api/products/${id}`)
  
      
      if(response.ok) {
        setProduct(response.payload.product)
      }
    }

    useEffect(() => {
      getProductById()
    }, [])

    return {
      product, getProductById
    }
  }
  catch (error) {
    console.log(error)
  }
}

export default useDetailProducts