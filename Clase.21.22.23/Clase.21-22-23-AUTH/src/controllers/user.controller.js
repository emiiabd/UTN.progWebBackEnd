import UserRepositorie from "../repositories/user.repository.js"
import { response200, response500 } from "../utils/responses.util.js"

const  setRoleController = async (req, res) =>{
  try{
    const {userID, role} = req.body

    const user = await UserRepositorie.findUserById(userID)

    user.role = role

    const newUser = await UserRepositorie.saveUser(user)

    const response = response200('Usuario creado', {
      payload: newUser
    })

    return res.status(200).json(response)
  }
  catch(error){
    const response = response500('Internal Server Error', {
      error: error
    })
    return res.status(500).json(response)
  }
  
}

export {
  setRoleController,
}