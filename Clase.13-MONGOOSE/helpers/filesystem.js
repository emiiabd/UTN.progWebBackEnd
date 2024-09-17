import filesystem from 'fs'
import { ERRORES } from '../constants/errors.js'

const createTxt = async (filename, text) =>{
  try{
    if(!filename){
      throw {detail: 'No hay nombre de archivo', name: 'INVALID_ARGUMENT'}
    }
    if(!text){
      throw {detail: 'No hay texto', name: 'INVALID_ARGUMENT'}
    }

    await filesystem.promises.writeFile('./logs/' + filename + '.txt', text, 'utf-8')
    console.dir('Archivo creado con exito')
  }
  catch(error){
    const errorCustom = ERRORES[error.name]

    if(errorCustom){
      errorCustom.action('index.js linea 31', error.detail)
    }
    
    /* console.log(errorCustom)
    console.log(error) */
    console.error('No se pudo guardar el archivo')
    throw error
  }
}

const procesoX = async () => {
  try{
    await createTxt( 'hola mundo')
    await createTxt('log-2', 'juansito')
    /* console.log('accion super importante') */
  }
  catch(error){
    console.error('Error en el proceso')
  }

}

/* procesoX() */

export {
  createTxt
}