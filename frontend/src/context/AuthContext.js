import { createContext, useContext, useState, useEffect } from 'react';
import { checkLogin } from '../services/AuthService';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(checkLogin())
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
