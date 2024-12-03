import { useLoaderData, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Order() {
    const { data, total_price } = useLoaderData();

    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleOrder = async (event) => {
        event.preventDefault()

        const request = {
            form_data: formData,
            cart_data: data.map((item) => {
                return {
                    id: item.id, quantity: item.quantity, price: item.price
                }
            }),
            total_price: total_price,
        }

        try {
            await axios.post(`http://localhost:8000/api/order/validate`, formData)
            setErrors({})

            const token = localStorage.getItem('token')
            await axios.post(`http://localhost:8000/api/order/user`, request, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setFormData({
                fullName: "",
                address: "",
                city: "",
                postalCode: "",
                phoneNumber: "",
                email: "",
            })

            alert("udało sie :)")

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
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleOrder} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-900">
                            Imie i nazwisko
                        </label>
                        <div className="mt-2">
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleOnChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName[0]}</div>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                            Ulica i numer domu / mieszkania
                        </label>
                        <div className="mt-2">
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleOnChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.address && <div style={{ color: 'red' }}>{errors.address[0]}</div>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm/6 font-medium text-gray-900">
                            Kod pocztowy
                        </label>
                        <div className="mt-2">
                            <input
                                id="postalCode"
                                name="postalCode"
                                type="text"
                                value={formData.postalCode}
                                onChange={handleOnChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.postalCode && <div style={{ color: 'red' }}>{errors.postalCode[0]}</div>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                            Miejscowość
                        </label>
                        <div className="mt-2">
                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleOnChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.city && <div style={{ color: 'red' }}>{errors.city[0]}</div>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">
                            Telefon
                        </label>
                        <div className="mt-2">
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={formData.phoneNumber}
                                onChange={handleOnChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber[0]}</div>}
                        </div>
                    </div>
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
                    {errors.global && <div style={{ color: 'red' }}>{errors.global}</div>}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                            Złóż zamówienie
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Order