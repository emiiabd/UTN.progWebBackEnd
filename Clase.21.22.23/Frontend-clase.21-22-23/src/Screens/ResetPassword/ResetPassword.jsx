import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUnauthenticatedHeaders } from '../../fetching/http.fetching'

const extractFormData = (formFields, formValues) => {
  for(let field in formFields){
    formFields[field] = formValues.get(field)
  }
  return formFields
}

const ResetPassword = () => {
 //capturar token con useParams
  const token = useParams()

  console.log(token.reset_token)

  const handleSubmitResetPassword = async (e) =>{
    try{
      e.preventDefault()
      const formValues = new FormData(e.target)
  
      const formFields = {
        'password': '',
      }
  
      const JSONFormValues = extractFormData(formFields,formValues)

      const res = await fetch(`http://localhost:3000/api/auth/reset-password/${token.reset_token}`,{
        method: 'PUT',
        headers: getUnauthenticatedHeaders(),
        body: JSON.stringify(JSONFormValues)
      })

      return console.log(res)
    }
    catch(err){
      console.log(err)
    }

  }  
  return (
    <div>
      <h1>Restablecer contraseña</h1>
      <form onSubmit={handleSubmitResetPassword}>
        <div>
          <label htmlFor="password">Ingrese su nueva contraseña: </label>
          <input type="text" name="password" id="password" placeholder='1234' />
        </div>
        <button type='submit'>Reestablecer</button>
      </form>

    </div>
  )
}

export default ResetPassword