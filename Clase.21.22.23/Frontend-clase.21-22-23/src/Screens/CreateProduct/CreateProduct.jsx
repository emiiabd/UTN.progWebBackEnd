import React, { useState } from 'react'
import useForm from '../../Hooks/useForm'
import { POST } from '../../fetching/http.fetching'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {

  const navigate = useNavigate()

  const formFields = {
    'title': '',
    'price': '',
    'stock': '',
    'description': '',
    'image': '',
    'category': '',
  }

  const { formValuesState, handleChangeInputValue, handleChangeFile } = useForm(formFields)

  const handleCreateProductSubmit = async (e) => {
    try{
      e.preventDefault()
      const response = await POST('/api/products', formValuesState)

      if(!response.ok) throw response

      navigate('./api/products/' + response.payload.product.id)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Crear un producto</h1>
      <form onSubmit={handleCreateProductSubmit}>
        <div>
          <label htmlFor="title">Ingrese el titulo: </label>
          <input type="text" name="title" id="title" placeholder='pepesuarez@gmail.com' onChange={handleChangeInputValue}/>
        </div>
        <div>
          <label htmlFor="price">Ingrese precio: </label>
          <input type="text" name="price" id="price" placeholder='1234' onChange={handleChangeInputValue}/>
        </div>
        <div>
          <label htmlFor="stock">Ingrese stock: </label>
          <input type="text" name="stock" id="stock" placeholder='1234' onChange={handleChangeInputValue}/>
        </div>
        <div>
          <label htmlFor="description">Ingrese descripcion: </label>
          <textarea name="description" id="description"onChange={handleChangeInputValue}></textarea>
        </div>
        <div>
          <label htmlFor="category">Ingrese categoria: </label>
          <input type="text" name="category" id="category" placeholder='1234' onChange={handleChangeInputValue}/>
        </div>
        <div>
          {
            formValuesState.image && <img src={formValuesState.image} alt="image" />
          }
          <label htmlFor="image">Cargar una imagen: </label>
          <input type="file" name="image" id="image" onChange={handleChangeFile} accept='image/*'/>
        </div>

        <button type='submit'>Crear</button>
      </form>

    </div>
  )
}

export default CreateProduct