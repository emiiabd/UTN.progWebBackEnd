import ENVIROMENT from './config/enviroment.config.js'
import express, { text } from 'express'
import statusRouter from './routes/status.router.js'
import mongoose from './db/config.js'
import DB_POOL from './db/configMySQL.js'
import authRouter from './routes/auth.router.js'
import transporter from './config/transporter.config.js'
import cors from 'cors'
import { verifyApiKeyMiddleware } from './middlewares/auth.middleware.js'
import productsRouter from './routes/products.router.js'
import userRouter from './routes/user.router.js'
import ProductRepository from './repositories/product.repository.js'

//process.env es una variable de entorno

const app = express()
const PORT = ENVIROMENT.PORT || 3000

app.use(cors()) //podriamos limitar el acceso con la ip, permitiendo que solo ciertas ip nos puedan hacer peticiones
app.use(express.json({limit: '5mb'}))
/* app.use(verifyApiKeyMiddleware)  *///No hay que activar la funcion

app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', userRouter)

ProductRepository.getProducts()

app.listen(PORT, () => console.log(`Server abierto en el puerto ${PORT}`))