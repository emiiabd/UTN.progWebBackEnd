import express from 'express'
import { verifyApiKeyMiddleware, verifyTokenMiddleware } from '../middlewares/auth.middleware.js'
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController } from '../controllers/product.controller.js'

const productsRouter = express.Router()

productsRouter.use(verifyApiKeyMiddleware)

productsRouter.get('/', verifyTokenMiddleware(), getAllProductsController)
productsRouter.get('/:product_id', verifyTokenMiddleware(), getProductByIdController)
productsRouter.post('/', verifyTokenMiddleware(['admin', 'seller']), createProductController)
productsRouter.put('/:product_id', verifyTokenMiddleware(['admin', 'seller']), updateProductController)
productsRouter.delete('/:product_id', verifyTokenMiddleware(['admin', 'seller']), deleteProductController)


export default productsRouter