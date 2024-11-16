import { useState } from "react"

//Los hooks siempre deben ser llamados dentro de componentes, no se puede llamar fuera de componentes. Reglas de REact
const useForm = ( formFields ) =>{
  //El estado solo se puede llamar dentro de un componente
  const [formValuesState, setFormValuesState] = useState(formFields)

  //handle sopn las funciones manejadoras de EVENTOS
  const handleChangeInputValue = (e) =>{
    const input_name = e.target.name
    const input_value = e.target.value
    
    setFormValuesState (
      (prevFormState) => {
        //Lo que se retorna de esta callback, se guardara como nuevo valor del estado
        //Llamamos el estaod previo, [la key q queremos guardar]: el valor de la key
        return {...prevFormState, [input_name]: input_value}
      }
    )
  }

  const handleChangeFile = (e) => {
    //Buscar el archivo que fue subido por ese input
    const input_name = e.target.name
    const fileFound = e.target.files[0]

    if(fileFound && fileFound.size > 5 *  1024 * 1024){
      //Hacer con el estado de error no alert
      alert('El archivo es demasiado pesado (limite 2MB)')
      return
    }
    const fileReader = new FileReader() //Es una clase que nos permite leer archivos y cambiar el formato de los archivos

    //Le decimos al lector de archivos que cuando termine de cargar, nos ejecute x callback
    fileReader.onloadend = () => {
      /* console.log('Carga finalizada') */
      //console.log(fileReader.result)
      /* setImage(fileReader.result) */
      setFormValuesState({...formValuesState, [input_name]: fileReader.result})
    }
    

    //Si existe tal archivo, leelo y cuando termines de leerlo, vas a ejecutar la callback
    if(fileFound){
      //Leemos el archivo que fue subido
      fileReader.readAsDataURL(fileFound)
    }
    
  }

  //magia de los hooks, retornamos un objeto
  return {
    formValuesState,
    handleChangeInputValue,
    handleChangeFile
  }

}

export default useForm