import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Screens/Login/Login'
import Register from './Screens/Register/Register'
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword'
import ResetPassword from './Screens/ResetPassword/ResetPassword'
import Home from './Screens/Home/Home'
import CreateProduct from './Screens/CreateProduct/CreateProduct'
import DetailProductScreen from './Screens/DetailProductScreen/DetailProductScreen'
import ProtectedRoute from './Components/ProtectedRoute'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/product/:id" element={<DetailProductScreen />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:reset_token' element={<ResetPassword/>}/>
      </Routes>
    </>
  )
}

export default App
