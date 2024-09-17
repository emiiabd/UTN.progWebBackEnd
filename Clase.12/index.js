// import { createTxt } from './helpers/filesystem.js' 
// Por el simple hecho de importar un modulo o archivo, ya se esta ejecutando el codigo interno del mismo
import { mongoose } from "./config/mongoDB.config.js";
import { ERRORES } from "./constants/errors.js";

/* 
MONGODB no tiene schemas (plantillas)
Mongoose trae schemas (plantillas)
*/

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    rol: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    create_at: {type: Date, default: Date.now}
  }
)

const Usuario = mongoose.model('Usuario', usuarioSchema)


const crearUsuario = async (nombre, email, rol, password, phone, address) =>{
  try{
    const usuario = new Usuario({
      nombre, 
      email, 
      rol, 
      password, 
      phone, 
      address})
      const result = await usuario.save()
      return result
  }
  catch(error){
    const customError= ERRORES[error.code]
    if (customError) {
      customError.action('index.js linea 24', error.code)
    }
  }
}

crearUsuario('juan', 'juann@juan', 'admin', '123', '+5493216002228', 'Mendoza, Arg.')