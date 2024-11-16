//mysql esta version se manejaba con callbacks

//mysql2 se maneja con promesas 

//CONSEJO DEL PROFE: APRENDER SUPABASE

import mysql from 'mysql2/promise';
import ENVIROMENT from '../config/enviroment.config.js';

const DB_POOL = mysql.createPool({
  host: ENVIROMENT.MYSQL.HOST,
  user: ENVIROMENT.MYSQL.USERNAME,
  password: ENVIROMENT.MYSQL.PASSWORD,
  database: ENVIROMENT.MYSQL.DATABASE,
  connectionLimit: 10
})

const checkConnection = async () =>{
  try{
    const connection = await DB_POOL.getConnection() //Devolver la conexion
    await connection.query('SELECT 1')//Consulta simple de excusa para verificar la conexion
    //Si falla la consulta se realiza un throw
    console.log('Conexion exitosa con MYSQL')
    connection.release() //Mata la conexion de la pool
  }
  catch (error) {
    console.error("Error al conectar con la base de datos")
  }
}

checkConnection() //Nos confirmara via consola que todo esta bien

export default DB_POOL