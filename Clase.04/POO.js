//Programacion orientada a objetos
let id_counter = 0
/* const crearProducto = (nombre, precio, descripcion) => {
  return {
    nombre: nombre, 
    precio: precio,
    id: id_counter++,
    descripcion: descripcion,
  }
}

const producto = crearProducto('pc Gamer', 2600, 'lorem')
const producto1 = crearProducto('pc Escritorio', 1400, 'lorem')
const producto2 = crearProducto('pc Dell', 200, 'lorem')
 */


// ESTA ES LA FORMA DE TRABAJAR POO EN ES5

//Funcion constructora
/* 
function Producto (nombre, precio, descripcion) {
  this.nombre = nombre
  this.precio = precio
  this.descripcion = descripcion
  this.id = id_counter++

  console.log(this) //esta palabra "this" hace autoreferencia al contexto dentro de la funcion 
}

Producto.prototype.saludar = function(){
  console.log('hola')
} 
  */

/* 
Cdad vez que se instancie el obj producto se va a crear la funcion saludar()

- las propiedades se crean en cada instancia del objeto
-  los metodos se crean una sola vez (como las funciones)
*/

// para crear un nuevo objeto (utilizando new)
/* const productoX = new Producto('pantalla', 1000, 'pantalla de 60 pulgadas')
console.log(productoX)

productoX.saludar() */

//LA FORMA CORRECTA DE TRABAJAR CON POO ES6, es con clases (class)

/* CLASES >
  - class palabra reservada
  - Las clases devuelven objetos
  - Las clases retornan siempre a this (el mismo objeto autoreferenciado)
  - Podemos modificar a this como si fuera un objeto (es un objeto, en el contexto de clases)

*/
class Personaje{ 

  // constructor palabra reservada (es una funcion que se invocara al instanciarse la clase)
  // constructor es la famosa funcion constructora de antes (en ES5)
  constructor(/* parametros de la funcion */ nombre){
    this.nombre = nombre

    //creamos la propiedad en el objeto, llamada propiedad_x con valor 'ramdom'
    this.propiedad_x= 'ramdom'

    //muestro por consola el objeto
    //console.log(this) Que es this en este contexto? Cdo esta en un contexto de clase, hace autoreferencia al objeto
  }

  //Para crear un metodo (los metodos se crean una sola vez, sirven para optimizar el programa)
  comer (comida) {
    console.log( this.nombre + ' esta comiendo ' + comida)
  }
}

// Instanciando la clase personaje
const personaje = new Personaje('pepe')

// Cuando creas un personaje, la idea es que siempre utilicemos las clases

const personaje2 = new Personaje('juan')

personaje.comer('papas')
personaje2.comer('empanas fritas')
