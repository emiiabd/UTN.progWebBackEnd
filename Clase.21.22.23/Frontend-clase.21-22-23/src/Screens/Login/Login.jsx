import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { POST } from '../../fetching/http.fetching'
import useForm from '../../Hooks/useForm'

const Login = () => {
  const navigate = useNavigate()
   //LOS COMPONENETES NO PUEDEN SER ASYNC
  const formFields = {
    'email': '',
    'password': '',
  }

  const { formValuesState, handleChangeInputValue } = useForm(formFields)

  const handleLoginSubmit = async (e) =>{
    try{
      e.preventDefault()
      const response = await POST('/api/auth/login', formValuesState)

      if(!response.ok) throw response
      const acces_token = response.payload.token

      sessionStorage.setItem('acces_token', acces_token)
      sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))

      navigate('/home')
    }
    catch(err){
      console.log(err)
    }

  }  
  return (
    <div>
      <h1>Inicia sesion en nuestra web</h1>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="email">Ingrese su email: </label>
          <input type="text" name="email" id="email" placeholder='pepesuarez@gmail.com' onChange={handleChangeInputValue}/>
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña: </label>
          <input type="text" name="password" id="password" placeholder='1234' onChange={handleChangeInputValue}/>
        </div>
        <button type='submit'>Logear</button>
      </form>
      <span>Si aun no tienes cuenta, <Link to="/register">Registrarse</Link></span><br/>
      <span>Olvidate tu contraseña?, <Link to="/forgot-password">Restablecer</Link></span>

    </div>
  )
}

export default Login



/* const extractFormData = (formFields, formValues) => {
  for(let field in formFields){
    formFields[field] = formValues.get(field)
  }
  return formFields
}


En algun futuro tener una funcion post(direccion, body) y devuelve el body de la respuesta


const sendLogin = async (JSONFormValues) =>{
  try{
    const res = await fetch('http://localhost:3000/api/auth/login',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(JSONFormValues)
    })
    const body = await res.json()
    return body
  }
  catch (error) {
    //errorers se manjean aqui
    // si hacemos:
    throw error
    //Se puede manejar el error en el handle
  }
} */