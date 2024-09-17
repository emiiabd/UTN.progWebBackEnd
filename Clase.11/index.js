const { calcularIva, formatearPrecio } =  require('./utils/calculosVarios.js')
const {validarEmail, validarNumero, validarNombre} = require('./utils/validaciones.js')
const { crearTxt, leerTxt, crearJSON, leerJSON } = require('./utils/sistemaArchivos.js')

/* console.dir(calcularIva(200))

const precio_vaso = 20

const objeto_iva = calcularIva(precio_vaso)

console.log(objeto_iva)

console.log('El iva del vaso es: ' + formatearPrecio(objeto_iva.iva))

console.log(validarEmail('a@a.com'), validarEmail('asdasda'))
console.log(validarNumero('a'), validarNumero(2135463213))
console.log(validarNombre('pepe'), validarNombre(3213))
 */

const persona = {
  nombre: 'pepe',
  edad: 90
}

crearJSON('persona-1', persona)

let persona_1 = leerJSON('persona-1')
console.log(persona_1)