import fs from 'fs'

const crearJson = async (fileName, data) =>{
  /* podriamos hacer validaciones y manejar errores */
  const file = `./public/${fileName}.json`
  await fs.promises.writeFile(file, JSON.stringify(data), 'utf-8')

  return true
}

const leerJson = async (fileName) =>{
  /* podriamos hacer validaciones y manejar errores */
  const file = `./public/${fileName}.json`
  const json = await fs.promises.readFile(file, 'utf-8')

  return JSON.parse(json)
}

export { 
  crearJson,
  leerJson 
}

