//GUardamos globalmente un estado que dice si estamos o no autentificados
//Que exista en el sessionStorage cargado el acces_token en el local/sessionStorage

//La idea de que este activo el access_token, el backend es el que te protege de eso

import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
  const acces_token = sessionStorage.getItem('access_token')
  //Estado booleano
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
    Boolean(acces_token)
  )

  useEffect(() => {
    const acces_token = sessionStorage.getItem('access_token')
    if(acces_token) setIsAuthenticatedUser(true)
  }, [])

  const logout = () => {
    sessionStorage.removeItem('access_token')
    setIsAuthenticatedUser(false)
  }

  return(
    <AuthContext.Provider value={{
      logout,
      isAuthenticatedUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

//Devuelve el objeto con el estado y la funcion de logout
const useAuthContext = () => useContext(AuthContext)

export {
  AuthContextProvider,
  useAuthContext,
  AuthContext
}