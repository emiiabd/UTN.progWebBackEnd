import express from 'express'
import productRouter from './routes/products.route.js'

const app = express()
const PORT = 8000

app.use(express.json())
app.use('/api/products', productRouter)


//Si el body es indefinido, lo mas seguro es que el problema es cuando el middleware esta mal configurado

app.listen(PORT, () => console.log(`Server abuerto en el puerto ${PORT}`))