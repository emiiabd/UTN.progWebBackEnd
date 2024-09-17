//Tema pendiente de TypeScript

/* 
- datos primitivos
- funciones
- objetos literales
- interfaces
- arrays?
- metodos avanzados de array
*/

/* const nombres : string[] = ['pepe', 'juan ', 'maria']
const notas : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] */

// Esto no lo vamos a utilizar por ahora
/*
const useState = () => {
    
 }
const arrayAvanzado : [string, number, boolean] = ['hola', 1, true]
const mostrarEdad=(persona : [string, number]) : void =>{
  console.log(persona[1])
} */

//obj array
// Utilizamos interfaces para el DRY (Dont Repeat Yourself, boludo)
/* interface Producto{
  nombre : string,
  id: number,
  precio: number,
  descripcion: string,
}

const producto : Producto = {
  nombre: 'pantalla',
  id: 1,
  precio: 10,
  descripcion: 'pantalla de 60 pulgadas'
}

const producto1 : Producto = {
  nombre: 'Computadora',
  id: 2,
  precio: 20,
  descripcion: 'Computadora de escritorio'
}

const producto2 : Producto = {
  nombre: 'Computadora',
  id: 3,
  precio: 60,
  descripcion: 'Computadora gamer',
}

const productList : Producto[] = [
  producto, 
  producto1,
  producto2, 
] */

/* 
forEach => void (con el profe utilizamos mas el for...of)

map => array | any array

filter => array con el tipo de array original
Productos[] => filter() => Productos[]

find => un elemento del array | undefined
Productos[] => find() => producto | undefined

findIndex => number index del array o -1


*/

/* const compuEscritorio : Producto | undefined = productList.find(
  (producto : Producto) : boolean => {
    return producto.id === 2
  }
) */


/* 
Un array de booleanos donde los productos cuyos precios sear menor a 40 esten como true, 
pero lo que sean mayores o iguales esten como false
*/


/* interface Producto2{
  precio: number,
}

const productos2 : Producto2[] = [
  {precio: 10},
  {precio: 20},
  {precio: 41},
  {precio: 50},
  ]

const listaBool : Boolean[] = productList.map(
  (obj : Producto) : boolean => {
    return obj.precio < 40
  })


console.log(listaBool) */


// POO en TypeScript

/* class Personaje {
  nombre : string

  constructor( nombre : string){
    this.nombre = nombre
  }
  comer (comida : string = 'nada' /* comida? : string /) : string {
    return this.nombre + ' Esta comiendo ' + comida
  }
}

const personaje1 : Personaje = new Personaje('pepe')
personaje1.comer('Hamburguesas')

let mensaje : string = personaje1.comer('Cualquier cosa')
console.log(mensaje) */

class Producto{
  nombre: string
  precio: number
  descripcion: string

  constructor(nombre : string, precio : number, descripcion : string){
    this.nombre = nombre
    this.precio = precio
    this.descripcion = descripcion
  }
}

let idCount = 0

class ManejadorProductos {
  productos : Producto[]
  id : number

  constructor(){
    this.productos = []
    this.id = idCount++
  }

  setNewProduct (producto : Producto) : Producto[] {
    this.productos.push(producto)
    return this.productos
  }
}

// Las buenas practicas incluye que todas las modificaciones de las propiedades de los objetos se utilicen metodos dentro de la clase

const manejadorProductos : ManejadorProductos = new ManejadorProductos() 

console.log(manejadorProductos)
console.log('hola')
const producto1 : Producto = new Producto('TV', 700, 'lorem')

manejadorProductos.setNewProduct(producto1)

console.log(manejadorProductos)

// manejadorProductos.productos.push(producto1) esto funciona pero no es una buena practiva, ya que seguramente se va a utilzar