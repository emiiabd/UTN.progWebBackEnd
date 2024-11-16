const URL_API = 'http://localhost:8000'

const obtenerProductos = async () =>{
  const response = await fetch(
    URL_API + '/api/products',
    {
        method: 'GET'
    }
)

console.log(await response.json())
}

const crearProducto =  async ({title, price, categoria, stock}) => {
  const response = await fetch(
          `${URL_API}/api/products`,
          {
              method: "POST",
              body: JSON.stringify({title, price, categoria, stock}),
              headers:{
                'Content-Type': 'application/json'
              }
          }
  )
  const data = await response.json()
  console.log(data)
}

crearProducto({title: 'hola', price: 10, categoria: 'TECNOLOGIA', stock: 10})