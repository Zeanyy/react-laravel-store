import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const SignOut = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()

    useEffect(() => {
        const logOut = async () => {
            setLoading(true)
            const token = localStorage.getItem('token')

            try {
                const response = await axios.get('http://localhost:8000/api/logout', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                console.log(response.data.message)
            } catch (error) {
                console.error('Error during logout', error)
            } finally {
                setLoading(false)
                localStorage.removeItem('token')
                setIsAuthenticated(false)
                navigate('/')
            }
        }

        logOut()

    }, [navigate])

    return (
        <div>
            {loading ? (
                <p>Logging out...</p>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    )
}

export default SignOut
