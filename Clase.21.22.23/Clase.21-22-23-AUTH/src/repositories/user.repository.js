import USER from "../models/user.model.js";
import express from 'express';

/* 
De tarea deberiamos pasar toda la comunicacion de la base de dato en el user repository
*/
//Manejamos la logica de comunicacion con la DB, relacionado a los usuarios
class UserRepositorie{
  static async findUserById(id){ //staticos para que este guardado en la misma clase y no necesitaremos instaciar la clase (new ...)
    const user = await USER.findOne({_id: id})
    return user
  }

  static async findUserByEmail(email){
    const user = await USER.findOne({email})
    return user
  }

  static async saveUser(user){
    const newUser = new USER(user)
    return await newUser.save()
  }

  static async setEmailVerify(userId){
    const user = await UserRepositorie.findUserById(userId)
    user.emailVerified = true
    return await UserRepositorie.saveUser(user)
  }

  static async setRole(userId, role){
    const user = await UserRepositorie.findUserById(userId)
    user.role = role
    return await UserRepositorie.saveUser(user)
  }
  
}
export default UserRepositorie


