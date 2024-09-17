import { ERRORES } from "../constants/errors.js"
import { Usuario } from "../models/user.model.js"

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

// Todo lo que interactue con la base de datos debe ser asynconico
const buscarUsuarioPorId = async (id) =>{
  try{
    if(!id){
      throw {error: 'No se recibio ningun id', code: 3};
      
    }
    //Esto devuelve una promesa
    const result = await Usuario.findById(id)
    return result
  }
  catch(error){
    throw error
  }
}

const actualizarUsuarioPorId = async (id, data) =>{
  //findByIdAndUpdate
  //Recibe el id, objetos de cambios y un objeto de configuraciones
  //Devuelve una promesa
  try{

    const updatedUser = await Usuario.findByIdAndUpdate(id, data, {new: true})
    console.log(updatedUser)
  }
  catch(error){
    console.log(error)
  }
}

const eliminarUsuarioPorId = async (id) =>{
  try{
    const resultado = await Usuario.findByIdAndDelete(id)
    console.warn(`El usuario ${resultado.email}, con id ${id} fue eliminado correctamente`)
  }
  catch(error){
    if(error){
      console.error('El usuario no fue encontrado')
    }
  }
}

export { crearUsuario, buscarUsuarioPorId, actualizarUsuarioPorId, eliminarUsuarioPorId }