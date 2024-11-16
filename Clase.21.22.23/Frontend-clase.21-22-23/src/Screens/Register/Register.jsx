import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import { extractFormData } from '../../utils/utils'
import { POST } from '../../fetching/http.fetching'


const Register = () => {
  
  const navidate = useNavigate()
  const formFields = {
    'name': '',
    'email': '',
    'password': '',
  }

  //NO se pueden modificar los estados, formValuesState.valor = 'pepe' => ESTO ESTA MAL
  const { formValuesState, handleChangeInputValue } = useForm(formFields)

  const handleSubmitRegisterForm = async (e) =>{
    try{
      e.preventDefault()
      const body = await POST('/api/auth/register', formValuesState)
      if(!body.ok) throw body
      return navidate('/login')
    }
    catch(err){
      console.log({error: err})
    }
  }
  
  return (
    <div>
      <h1>Registrate en nuestra web</h1>
      <form onSubmit={handleSubmitRegisterForm}>
        <div>
          <label htmlFor="name">Ingrese su nombre: </label>
          <input type="text" name="name" id="name" placeholder='Pepe Suarez' onChange={handleChangeInputValue}/>
        </div>
        <div>
          <label htmlFor="email">Ingrese su email: </label>
          <input type="text" name="email" id="email" placeholder='pepesuarez@gmail.com' onChange={handleChangeInputValue} />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña: </label>
          <input type="text" name="password" id="password" placeholder='1234'  onChange={handleChangeInputValue}/>
        </div>
        <button type='submit'>Registrar</button>
      </form>
      <span>Si ya tienes cuentas puedes ir a <Link to="/login">login</Link></span>

    </div>
  )
}

export default Register
  /*   fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json' //aca le indicamos al back que le enviamos un JSON
      },
      body: JSON.stringify(objectFormValues)
    })
    .then(
      (resHTTP) => {
        console.log({resHTTP})
        return resHTTP.json()
      }
    )
    .then(
      //Este then trabaja sobre la res.json por que es una promesa
      (body) => {
        console.log({body})
      }
    )
    .catch(
      (error) => {
        console.error(error)
      }
    )

    console.log(objectFormValues) */