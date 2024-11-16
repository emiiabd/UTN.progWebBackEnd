//conexion con la base de dato
import mongoose from 'mongoose';
import ENVIROMENT from '../config/enviroment.config.js';

//dato sensible colocarle la url de la base de datos
mongoose.connect(ENVIROMENT.DB_URL)
.then(
  () => {
    console.log('Conexion exitosa con la DB')
  }
)
.catch(
  (err) => {
    console.error('Error de conexion con la DB')
  }
)

export default mongoose