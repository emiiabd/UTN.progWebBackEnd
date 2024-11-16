
import React from 'react'
import { Link } from 'react-router-dom'
import { getUnauthenticatedHeaders } from '../../fetching/http.fetching'

const extractFormData = (formFields, formValues) => {
  for(let field in formFields){
    formFields[field] = formValues.get(field)
  }
  return formFields
}

const ForgotPassword = () => {

  const handleForgotPassword = async (e) =>{
    try{
      e.preventDefault()
      const formValues = new FormData(e.target)
  
      const formFields = {
        'email': '',
      }
  
      const JSONFormValues = extractFormData(formFields,formValues)

      const res = await fetch('http://localhost:3000/api/auth/forgot-password',{
        method: 'POST',
        headers: getUnauthenticatedHeaders(),
        body: JSON.stringify(JSONFormValues)
      })

      return console.log(res.json)
    }
    catch(err){
      console.log(err)
    }

  }  
  return (
    <div>
      <h1>Olvidates tu contraseña?</h1>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label htmlFor="email">Ingrese su email: </label>
          <input type="text" name="email" id="email" placeholder='pepesuarez@gmail.com' />
        </div>
        <button type='submit'>Enviar mail</button>
      </form>
      <span>Si tiene cuenta puedes <Link to="/login">logearse</Link></span><br/>
      <span>Si aun no tienes cuenta puedes <Link to="/register">registrarse</Link></span>
    </div>
  )
}

export default ForgotPassword