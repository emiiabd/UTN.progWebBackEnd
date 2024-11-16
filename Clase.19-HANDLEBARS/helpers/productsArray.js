const productArr=[
  { 
    id: 1,
    nombre: 'Tv samsung',
    precio: '100',
    descripcion: 'Tv de 85 pulgadas',
    stock: 8
  },
  { 
    id: 2,
    nombre: 'Tv LG',
    precio: '150',
    descripcion: 'Tv home con internet',
    stock: 3
  },
  { 
    id: 3,
    nombre: 'Tv Noblex',
    precio: '200',
    descripcion: 'Tv grande',
    stock: 7
  }
]

const errors = {
  nombre: null,
  stock: null,
  precio: null,
  descripcion: null,
  id: null
}

export { 
  productArr,
  errors 
}