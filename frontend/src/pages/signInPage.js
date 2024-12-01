import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useAuth } from '../context/AuthContext';

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const { setIsAuthenticated } = useAuth()

    const navigate = useNavigate()

    const handleOnChange = (event) => {
        const {name, value} = event.target
    
        if(name === "email") {
            setEmail(value)
        } else if(name === "password") {
            setPassword(value)
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
    
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            })
    
            const response = await axios.post('http://localhost:8000/api/login', {
                email: email,
                password: password,
            })
    
            setEmail('')
            setPassword('')
            setErrors({})

            localStorage.setItem('token', response.data.token)
            setIsAuthenticated(true)
            navigate('/')
    
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({ global: 'Spróbuj ponownie później.' })
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email[0]}</div>}
                </div>
                
                <div>
                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password[0]}</div>}
                </div>
                <button type="submit">Zaloguj się</button>
                {errors.global && <div style={{ color: 'red' }}>{errors.global}</div>}
            </form>

            <h3>Nie masz konta?</h3>
            <Link to="/signup">Zarejestruj się</Link>
        </>
    )
}

export default SignIn