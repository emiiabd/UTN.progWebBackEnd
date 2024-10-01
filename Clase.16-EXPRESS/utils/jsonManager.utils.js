import fs from 'fs';

const FILENAME = `./data/products.json`


const crearJson = async (data) => {
  try{
    await fs.promises.writeFile(FILENAME, JSON.stringify(data), 'utf-8')
    return true
  }
  catch(error){
    return false
  }
}

const leerJson = async () => {
  try{
    const json = await fs.promises.readFile(FILENAME, 'utf-8')
    return JSON.parse(json)
  }
  catch(error){
    return false
  }
}

export { crearJson, leerJson }
