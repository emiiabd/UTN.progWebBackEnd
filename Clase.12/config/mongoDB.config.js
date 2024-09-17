/* 
/////// INSTALACION DE MONGOOSE ///////

npm i mongoose

*/

import mongoose from "mongoose";
const DB_URL = 'mongodb://localhost:27017'
const DB_NAME = 'APP_HOMEWORKING_UTN'
const DB_CONNECTION_STRING = `${DB_URL}/${DB_NAME}`

mongoose.connect(DB_CONNECTION_STRING)

const db =  mongoose.connection

db.once('open', () => {
  console.log('Conexion existosa con MONGO DB')
})

db.on('error', () =>{
  console.error('ERROR EN LA BASE DE DATOS MONGO DB ' )
})

//Estamos exportando a mongoose que ya esta conectado
//y a database (db) para poder interactuar con la misma
export { mongoose, db }