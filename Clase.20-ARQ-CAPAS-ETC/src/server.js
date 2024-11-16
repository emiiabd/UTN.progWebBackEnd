import ENVIROMENT from './config/enviroment.config.js'
import express from 'express'
import statusRouter from './routes/status.router.js'
import configDb from './db/config.js'
import authRouter from './routes/auth.router.js'


//process.env es una variable de entorno

const app = express()
const PORT = ENVIROMENT.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server abierto en el puerto ${PORT}`))