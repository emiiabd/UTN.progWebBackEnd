import ProductRepository from "../repositories/product.repository.js"

const validateDuplicateProduct = async (title, seller_id) => {
  const products = await ProductRepository.getProductBySellerId(seller_id)
  for(let product of products){
    if(product.title === title){
      return false
    }
  }
  return true
}

export {
  validateDuplicateProduct,
}