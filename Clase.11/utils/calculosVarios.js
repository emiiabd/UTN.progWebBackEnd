/* Crear una funcion que reciba un precio y retorne un objeto con 
recibe 100
{
  iva: 21,
  precion_originar: 100,
  precio_final: 121,
}
*/

/* con type: module 
export const calcularIva = (num) => {
  return {
    iva: 21,
    precio_original: num,
    precio_final: num + num*0.21
  }
}
*/

const calcularIva = (num) => {
  return {
    iva: num*0.21,
    precio_original: num,
    precio_final: num + num*0.21
  }
};

const formatearPrecio = (precio) => {
  return '$'+Number(precio).toFixed(2)
}
module.exports = {nombre: 'pepe', calcularIva: calcularIva, formatearPrecio}
