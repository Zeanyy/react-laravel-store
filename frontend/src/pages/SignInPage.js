import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { signIn } from "../services/AuthService";

function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const { setIsAuthenticated } = useAuth()

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await signIn(formData)

            setFormData({
                email: "",
                password: "",
            })
            setErrors({})

            localStorage.setItem('token', response.token)
            setIsAuthenticated(true)
            navigate('/')

        } catch (error) {
            if (error.errors) {
                setErrors(error.errors)
            } else {
                setErrors({ global: error })
            }
        }
    }

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Adres e-mail
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={formData.email}
                                onChange={handleOnChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.email && <div style={{ color: 'red' }}>{errors.email[0]}</div>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            Hasło
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleOnChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.password && <div style={{ color: 'red' }}>{errors.password[0]}</div>}
                        </div>
                        {errors.global && <div style={{ color: 'red' }}>{errors.global}</div>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                            Zaloguj się
                        </button>
                    </div>
                </form>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
                Nie masz konta?
                <Link to="/signup" className="font-semibold ml-1 text-indigo-600 hover:text-indigo-500">
                    Załóż konto
                </Link>
            </p>
        </>
    )
}

export default SignIn