**/ACLARACION cuando coloquemos <> no es HTML o algo que deba usarse, simplemente visual para el documento./**

use <nombre-base-de-datos> | Van a escribir: use  db_clases

Movernos a la base de datos que queremos usar
use <nombre-base-de-datos>

## Crear una coleccion
db hace referencia las bases de datos

db.createCollection("<nombre-coleccion>")

ej.: db.createCollection("usuarios")

## Insertar en nuestra coleccion:

db.<nombre-coleccion-a-insertar>.insertOne(<objeto-de-insercion>)
db.<nombre-coleccion-a-insertar>.insertMany(<array-de-insercion>)

db.usuarios.insertOne({
  nombre: "pepe",
  email: "pepe@gmail.com",
  rol: "usuario",
  password: "pepesito123",
  nro_telefono: "+5492615522002",
  direccion: "Mendoza, Arg.",
  creado_en: new Date()
})

db.usuarios.insertMany([
{
  nombre: "pepe",
  email: "pepe@gmail.com",
  rol: "usuario",
  password: "pepesito123",
  nro_telefono: "+5492615522002",
  direccion: "Mendoza, Arg.",
  creado_en: new Date()
},
{
  nombre: "pepe",
  email: "pepe@gmail.com",
  rol: "usuario",
  password: "pepesito123",
  nro_telefono: "+5492615522002",
  direccion: "Mendoza, Arg.",
  creado_en: new Date()
}
])

## Buscar elementos en nuestra db

se buysca pasandole un objeto con su propiedad. Find es como un filter en javaScript

find en mongoDB devuelve un array
db.usuarios.find({email: 'pepe@gmail.com'})

finOne, te devuelve el primer objeto que encuentra
db.usuarios.findOne({email: 'pepe@gmail.com'})

## Eliminar un elemento

db.usuarios.deleteOne({_id: ObjectId('66d9ae86964366710f48f389')})

## Eliminar multiples elementos

db.usuarios.deleteMany({<condicion>})

## Actualidar elementos

Primero se pasa el objeto de filtro, segundo la condicion a modificar
db.usuarios.updateOne(
{
  _id: ObjectId('66d9ae86964366710f48f38a')
},
{
  $set: {
    email: "pepesito@gmail.com",
    nro_telefono: "+549265465342",
    nombre: "Pepesito",
    password: "pedro111"
  }
}
)