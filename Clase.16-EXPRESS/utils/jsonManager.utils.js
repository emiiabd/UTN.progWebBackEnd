import fs from 'fs';

const crearJson = async (data) => {
  const file = `./data/products.json`
  try{
    await fs.promises.writeFile(file, JSON.stringify(data), 'utf-8')
    return true
  }
  catch(error){
    return false
  }

}

const leerJson = async () => {
  const file = `./data/products.json`
  try{
    const json = await fs.promises.readFile(file, 'utf-8')
    return JSON.parse(json)
  }
  catch(error){
    return false
  }

}

export { crearJson, leerJson }
