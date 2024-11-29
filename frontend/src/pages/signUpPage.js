import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState({})
    const { setIsAuthenticated } = useAuth()

    const navigate = useNavigate()

    const handleOnChange = (event) => {
        const { name, value } = event.target
        if (name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "password_confirmation") {
            setPasswordConfirmation(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            })

            const response = await axios.post('http://localhost:8000/api/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
            })

            setEmail('')
            setPassword('')
            setPasswordConfirmation('')
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
                    <label htmlFor="name">Nazwa</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                    />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name[0]}</div>}
                </div>
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
                </div>
                <div>
                    <label htmlFor="password_confirmation">Powtórz hasło</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={handleOnChange}
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password[0]}</div>}
                </div>
                {errors.global && <div style={{ color: 'red' }}>{errors.global}</div>}
                <button type="submit">Zarejestruj się</button>
            </form>
        </>
    )
}

export default SignUp
