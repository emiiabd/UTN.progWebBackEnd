
// Modulo NATIVO del sistema de archivos de node.js

// El sistema de archivos es lo que tiene cualquier SO para poder crear textos, files, etc.
const filesystem = require('fs')

const crearTxt = () =>{
  /*
  Crear un archivo de manera sincronica
    Esta funcion recibe 3 parametros:
    - direccion o path donde se crea el archivo con el nombre del archivo y su respectiva extension
    - info o data a escribir
    - encoding o codificacion de caracteres (character code)
  */
  filesystem.writeFileSync('./archivos/archivo.txt', 'Hola mundo desdew node.js pepepe', 'utf-8')
}

const leerTxt = () =>{
  const data = filesystem.readFileSync('./archivos/archivo.txt', 'utf-8')
  console.log('El contenido de archivo.txt es: ' + data)
}

const crearJSON = (direccion_y_nombre, contenido) => {
  filesystem.writeFileSync('./archivos/json/' + direccion_y_nombre + '.json', JSON.stringify(contenido), 'utf-8')
  console.log(`Archivo: ./archivos/json/${direccion_y_nombre}.json ha sido creado con exito! 🚀😎`)
}

const leerJSON = (direccion_y_nombre) => {
  const data = filesystem.readFileSync('./archivos/json/' + direccion_y_nombre + '.json', 'utf-8')
  return JSON.parse(data)
}

module.exports = { crearTxt, leerTxt, crearJSON, leerJSON }