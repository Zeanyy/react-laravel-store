import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await axios.get('http://localhost:8000/api/checkLogin', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          if (response.status === 200) {
            setIsAuthenticated(true)
          }
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
